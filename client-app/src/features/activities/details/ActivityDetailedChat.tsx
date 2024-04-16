import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import { formatDistanceToNow } from "date-fns";
import * as yup from "yup";

function ActivityDetailedChat() {
  const { commentStore } = useStore();
  const { id: activityId } = useParams<{ id: string }>();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }

    return () => {
      commentStore.clearComments();
    };
  }, [activityId, commentStore]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={yup.object({
            body: yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      rows={3}
                      disabled={isSubmitting}
                      placeholder="Enter your comment (Press ENTER to submit, ENTER + SHIFT for new line "
                      {...props.field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && event.shiftKey) {
                          return;
                        }

                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>

        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image ?? "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
}

export default observer(ActivityDetailedChat);
