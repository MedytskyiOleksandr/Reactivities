import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Activity} from '../../models/activity';
import {
  activityDetails,
  createActivity,
  deleteActivity,
  editActivity,
  fetchActivities,
} from './ActionCreators';

export interface ActivitiesState {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  isLoading: boolean;
  isDeleting: boolean;
  error: string;
}

export const initialState: ActivitiesState = {
  activities: [],
  selectedActivity: undefined,
  isLoading: false,
  isDeleting: false,
  error: '',
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActivities.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchActivities.fulfilled.type]: (
      state,
      action: PayloadAction<Activity[]>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.activities = action.payload;
    },
    [fetchActivities.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createActivity.pending.type]: state => {
      state.isLoading = true;
    },
    [createActivity.fulfilled.type]: (
      state,
      action: PayloadAction<Activity>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.activities.push(action.payload);
    },
    [createActivity.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [editActivity.pending.type]: state => {
      state.isLoading = true;
    },
    [editActivity.fulfilled.type]: (state, action: PayloadAction<Activity>) => {
      state.isLoading = false;
      state.error = '';
      const index = state.activities.findIndex(
        activity => activity.id === action.payload.id,
      );
      state.activities[index] = {...state.activities[index], ...action.payload};
    },
    [editActivity.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteActivity.pending.type]: state => {
      state.isDeleting = true;
    },
    [deleteActivity.fulfilled.type]: (
      state,
      action: PayloadAction<Activity>,
    ) => {
      state.isDeleting = false;
      state.error = '';
      let index = state.activities.findIndex(
        activity => activity.id === action.payload.id,
      );
      state.activities.splice(index, 1);
    },
    [deleteActivity.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isDeleting = false;
      state.error = action.payload;
    },
    [activityDetails.pending.type]: state => {
      state.isLoading = true;
    },
    [activityDetails.fulfilled.type]: (
      state,
      action: PayloadAction<Activity>,
    ) => {
      state.isLoading = false;
      state.error = '';
      state.selectedActivity = action.payload;
    },
    [activityDetails.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default activitiesSlice.reducer;
