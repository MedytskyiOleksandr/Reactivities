import {Activity} from '../models/activity';

export function sortActivitiesByDate(activities: Activity[]) {
  activities.sort((a, b) => {
    return Date.parse(a.date) - Date.parse(b.date);
  });
}
