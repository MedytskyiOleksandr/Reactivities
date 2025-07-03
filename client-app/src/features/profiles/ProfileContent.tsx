import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";

const panes = [
  {
    menuItem: "About",
    render: () => <ProfileAbout />,
  },
  {
    menuItem: "Photos",
    render: () => <ProfilePhotos />,
  },
  {
    menuItem: "Events",
    render: () => <Tab.Pane>Events Content</Tab.Pane>,
  },
  {
    menuItem: "Followers",
    render: () => <ProfileFollowings />,
  },
  {
    menuItem: "Following",
    render: () => <ProfileFollowings />,
  },
];

export default observer(function ProfileContent() {
  const {
    profileStore: { setActiveTab },
  } = useStore();

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
    />
  );
});
