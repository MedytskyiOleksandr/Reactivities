import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import { Profile } from "../../app/models/profile";
import * as yup from "yup";
import TextInput from "../../app/common/form/TextInput";
import { Button } from "semantic-ui-react";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

const validationSchema = yup.object({
  displayName: yup.string().required(),
});

export default observer(function ProfilEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();

  const initialValues: Partial<Profile> = {
    displayName: profile?.displayName,
    bio: profile?.bio ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        updateProfile(values).then(() => setEditMode(false))
      }
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <TextInput placeholder="Display Name" name="displayName" />
          <TextInput rows={3} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
