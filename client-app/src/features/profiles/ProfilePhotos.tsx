import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

export default observer(function ProfilePhotos() {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploadingPhoto,
      setMainPhoto,
      loadingPhoto,
      deletePhoto,
      profile,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    event: SyntheticEvent<HTMLButtonElement>,
    photo: Photo
  ) {
    setTarget(event.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    event: SyntheticEvent<HTMLButtonElement>,
    photo: Photo
  ) {
    setTarget(event.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon={"image"} content="Photos" />
          {isCurrentUser && (
            <Button
              disabled={uploadingPhoto}
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile?.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"main" + photo.id}
                        disabled={photo.isMain}
                        loading={target === "main" + photo.id && loadingPhoto}
                        onClick={(event) => handleSetMainPhoto(event, photo)}
                      />
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        name={photo.id}
                        loading={target === photo.id && loadingPhoto}
                        disabled={photo.isMain}
                        onClick={(event) => handleDeletePhoto(event, photo)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
