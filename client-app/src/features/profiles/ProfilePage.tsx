import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const { profileStore } = useStore();
  const { loadProfile, loadingProfile, profile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);

    return () => setActiveTab(0);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
