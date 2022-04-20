import axios, {AxiosResponse} from 'axios';
import {Activity} from '../models/activity';

const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://10.0.2.2:5000/api';

axios.interceptors.response.use(async responce => {
  try {
    await sleep(1000);
    return responce;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const responceBody = <T,>(responce: AxiosResponse<T>) => responce.data;

const requests = {
  get: <T,>(url: string) => axios.get<T>(url).then(responceBody),
  post: <T,>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responceBody),
  put: <T,>(url: string, body: {}) =>
    axios.put<T>(url, body).then(responceBody),
  delete: <T,>(url: string) => axios.delete<T>(url).then(responceBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
