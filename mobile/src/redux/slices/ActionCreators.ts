import {createAsyncThunk} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import agent from '../../api/Axios';
import {Activity} from '../../models/activity';
import {sortActivitiesByDate} from '../../utils/utilities';

export const fetchActivities = createAsyncThunk(
  'activities/fetch',
  async (_, thunkAPI) => {
    try {
      const responce = await agent.Activities.list();
      sortActivitiesByDate(responce);
      return responce;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createActivity = createAsyncThunk(
  'activities/create',
  async (activity: Activity, thunkAPI) => {
    activity.id = uuid.v4().toString();
    try {
      const responce = await agent.Activities.create(activity);
      return responce;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editActivity = createAsyncThunk(
  'activities/edit',
  async (activity: Activity, thunkAPI) => {
    try {
      await agent.Activities.update(activity);
      return {activity};
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async (id: string, thunkAPI) => {
    try {
      await agent.Activities.delete(id);
      return {id};
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const activityDetails = createAsyncThunk(
  'activities/details',
  async (id: string, thunkAPI) => {
    try {
      const respone = await agent.Activities.details(id);
      return respone;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);
