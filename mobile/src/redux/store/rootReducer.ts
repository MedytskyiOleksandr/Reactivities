import {combineReducers} from '@reduxjs/toolkit';
import activityReducer from '../slices/activitySlice';

const rootReducer = combineReducers({
  activityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
