import React, {useEffect, useState} from 'react';

import {Activity} from '../models/activity';
import agent from '../api/Axios';
import ActivityList from '../components/activtities/ActivityList';

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    agent.Activities.list().then(responce => {
      let activitiesArray: Activity[] = [];
      responce.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activitiesArray.push(activity);
      });
      setActivities(activitiesArray);
    });
  }, []);

  return <ActivityList activities={activities} />;
}

export default Activities;
