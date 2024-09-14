import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent } from "react";

interface Props {
  profile: Profile;
}

function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (profile.username === userStore.user?.username) return null;

  const handleFollow = (event: SyntheticEvent) => {
    event.preventDefault();
    updateFollowing(profile.username, !profile.following);
  };

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          color="teal"
          fluid
          content={profile.following ? "Following" : "Not following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          basic
          color={profile.following ? "red" : "green"}
          fluid
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={handleFollow}
          loading={loading}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(FollowButton);
