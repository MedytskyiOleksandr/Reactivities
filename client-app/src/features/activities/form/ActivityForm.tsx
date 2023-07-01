import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";

import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import TextInput from "../../../app/common/form/TextInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateIntup";
import { ActivityFormValues } from "../../../app/models/activity";

function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, editActivity, loadActivity, loadingInitial } =
    activityStore;

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required!"),
    date: Yup.string().required("The activity date is required!").nullable(),
    description: Yup.string().required("The activity description is required!"),
    category: Yup.string().required("The activity category is required!"),
    city: Yup.string().required("The activity city is required!"),
    street: Yup.string().required("The activity street is required!"),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      });
    }
  }, [id, loadActivity]);

  function submitFormHandler(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />;
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => submitFormHandler(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <>
            <Header content="Activity Details" sub color="teal" />
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <TextInput placeholder="Title" name="title" />
              <TextInput
                rows={3}
                placeholder="Description"
                name="description"
              />
              <SelectInput
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
              <DateInput
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <Header content="Location Details" sub color="teal" />
              <TextInput placeholder="City" name="city" />
              <TextInput placeholder="Street" name="street" />
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                as={Link}
                to="/activities"
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          </>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
