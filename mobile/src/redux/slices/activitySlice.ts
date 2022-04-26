import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Activity} from '../../models/activity';
import {
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
      state.activities = [...state.activities, action.payload];
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
      state.activities = [...state.activities, action.payload];
    },
    [editActivity.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteActivity.pending.type]: state => {
      state.isDeleting = true;
    },
    [deleteActivity.fulfilled.type]: (
      state,
      action: PayloadAction<Activity[]>,
    ) => {
      state.isDeleting = false;
      state.error = '';
      state.activities = action.payload;
    },
    [deleteActivity.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isDeleting = false;
      state.error = action.payload;
    },
  },
});

export default activitiesSlice.reducer;
