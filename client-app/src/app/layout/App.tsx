import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavigationBar from "./NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/Axios";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((responce) => {
      let activities: Activity[] = [];
      responce.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setIsLoading(false);
    });
  }, []);

  function selectActivityHandler(id: string) {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  }

  function cancelSelectedAtivityHandler() {
    setSelectedActivity(undefined);
  }

  function openFormHandler(id?: string) {
    id ? selectActivityHandler(id) : cancelSelectedAtivityHandler();
    setEditMode(true);
  }

  function closeFormHandler() {
    setEditMode(false);
  }

  function activityEditOrCreateHandler(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((act) => act.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function deleteActivityHandler(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((activity) => activity.id !== id)]);
      setSubmitting(false);
    });
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavigationBar openForm={openFormHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivityHandler}
          cancelSelectedActivity={cancelSelectedAtivityHandler}
          editMode={editMode}
          openForm={openFormHandler}
          closeForm={closeFormHandler}
          createOrEdit={activityEditOrCreateHandler}
          deleteActivity={deleteActivityHandler}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
