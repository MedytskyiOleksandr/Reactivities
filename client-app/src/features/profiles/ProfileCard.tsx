import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, CardContent, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";
import { truncate } from "../../app/common/helpers/string-operations";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <CardContent extra>
        <Icon name="user" />
        {profile.followersCount} followers
      </CardContent>
      <FollowButton profile={profile} />
    </Card>
  );
});
