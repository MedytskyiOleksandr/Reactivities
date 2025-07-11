import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {Activity, ActivityFormValues} from "../models/activity";
import {User, UserFormValues} from "../models/user";
import {store} from "../stores/store";
import {Photo, Profile} from "../models/profile";
import {router} from "../router/Routes";
import {PaginatedResult} from "../models/pagination.ts";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];

    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }

    if (import.meta.env.DEV) await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
      case 400: {
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && Object.prototype.hasOwnProperty.call(data.errors, "id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      }
      case 401: {
        toast.error("unauthorized");
        break;
      }
      case 404: {
        router.navigate("/not-found");
        break;
      }
      case 500: {
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
      }
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, config?: object) => axios.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body?: object, config?: AxiosRequestConfig) =>
    axios.post<T>(url, body, config).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) => requests.get<PaginatedResult<Activity[]>>("/activities", {params}),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>("/activities", activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (formData: FormData) =>
    requests.post<Photo>("/photos", formData, {
      headers: {"Content-Type": "multipart/form-data"},
    }),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put("/profiles", profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string | undefined, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
};

const agent = {
  Activities,
  Account,
  Profiles,
};

export default agent;
