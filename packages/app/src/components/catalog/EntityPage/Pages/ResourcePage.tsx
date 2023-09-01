import {
  EntityAboutCard,
  EntityHasSubcomponentsCard,
  EntityLayout,
  EntityLinksCard,
  EntitySwitch,
} from '@backstage/plugin-catalog';
import Grid from '@mui/material/Grid';
import React from 'react';
import {
  ClusterAvailableResourceCard,
  ClusterContextProvider,
  ClusterInfoCard,
} from '@janus-idp/backstage-plugin-ocm';
import { isType } from '../../utils';
import { EntityCatalogGraphCard } from '@backstage/plugin-catalog-graph';

export const resourcePage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>

        <Grid item md={4} xs={12}>
          <EntityLinksCard />
        </Grid>
        <Grid item md={8} xs={12}>
          <EntityHasSubcomponentsCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route
      path="/status"
      title="status"
      if={isType('kubernetes-cluster')}
    >
      <ClusterContextProvider>
        <Grid container direction="column" xs={6}>
          <Grid item>
            <ClusterInfoCard />
          </Grid>
          <Grid item>
            <ClusterAvailableResourceCard />
          </Grid>
        </Grid>
      </ClusterContextProvider>
    </EntityLayout.Route>
  </EntityLayout>
);
