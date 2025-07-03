import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Grid, Loader} from "semantic-ui-react";

import {useStore} from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";
import {PagingParams} from "../../../app/models/pagination.ts";
import InfiniteScroll from "react-infinite-scroller";

function ActivityDashboard() {
  const {activityStore} = useStore();
  const {activityRegistry, loadActivities, setPagingParams, pagination} = activityStore;

  const [loading, setLoading] = useState(false);

  const handlePageChange = () => {
    setLoading(true);
    setPagingParams(new PagingParams({pageNumber: (pagination?.currentPage ?? 0) + 1}));
    loadActivities().finally(() => setLoading(false));
  }

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      (async () => await loadActivities())();
    }
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial && !loading) {
    return <LoadingComponent content="Loading activities..."/>;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <InfiniteScroll pageStart={0} loadMore={handlePageChange}
                        hasMore={!loading && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}>
          <ActivityList/>
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter/>
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loading}/>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
