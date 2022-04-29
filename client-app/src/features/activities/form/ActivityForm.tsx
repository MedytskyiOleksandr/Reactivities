import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    editActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    street: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
    }
  }, [id, loadActivity]);

  function submitHandler() {
    if (activity.id.length === 0) {
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

  function onChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />;
  }

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={onChangeHandler}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={onChangeHandler}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={onChangeHandler}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={onChangeHandler}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={onChangeHandler}
        />
        <Form.Input
          placeholder="Street"
          value={activity.street}
          name="street"
          onChange={onChangeHandler}
        />
        <Button
          loading={loading}
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
    </Segment>
  );
}

export default observer(ActivityForm);
