import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Comment } from "../models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
  comments: Comment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(
          import.meta.env.VITE_COMMENT_URL + "?activityId=" + activityId,
          {
            accessTokenFactory: () => store.userStore.user?.token ?? '',
          }
        )
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing the connection:", error)
        );

      this.hubConnection.on("LoadComments", (comments: Comment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + "Z");
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComments", (comment: Comment) => {
        runInAction(() => this.comments.unshift(comment));
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection:", error));
  };

  addComment = async (values: { body: string; activityId?: string }) => {
    values.activityId = store.activityStore.selectedActivity?.id;

    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log("Error sending comment:", error);
    }
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };
}
