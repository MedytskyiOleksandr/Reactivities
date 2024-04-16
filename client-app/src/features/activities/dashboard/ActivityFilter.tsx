
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

function ActivityFilter() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 28 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I`m hosting" />
        <Menu.Item content="I`m folowing" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}

export default ActivityFilter;
