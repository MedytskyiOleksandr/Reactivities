import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import TestErrors from "../../features/errors/TestErrors";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        element: <RequireAuth/>, children: [
          {path: "activities", element: <ActivityDashboard/>},
          {path: "activities/:id", element: <ActivityDetails/>},
          {path: "createActivity", element: <ActivityForm key="create"/>},
          {path: "manage/:id", element: <ActivityForm key="manage"/>},
          {path: "profiles/:username", element: <ProfilePage/>},
          {path: "errors", element: <TestErrors/>},
        ]
      },
      {path: "server-error", element: <TestErrors/>},
      {path: "not-found", element: <NotFound/>},
      {path: "*", element: <Navigate replace to="/not-found"/>},
    ],
  },
];

export const router = createBrowserRouter(routes);
