import { EntityLayout, EntitySwitch } from '@backstage/plugin-catalog';
import Grid from '@mui/material/Grid';
import React from 'react';
import {
  ClusterAvailableResourceCard,
  ClusterContextProvider,
  ClusterInfoCard,
} from '@janus-idp/backstage-plugin-ocm';
import { isType } from '../../utils';

export const resourcePage = (
  <EntityLayout>
    {/* ... */}
    {/* highlight-add-start */}
    <EntityLayout.Route path="/status" title="status">
      <EntitySwitch>
        <EntitySwitch.Case if={isType('kubernetes-cluster')}>
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
        </EntitySwitch.Case>
      </EntitySwitch>
    </EntityLayout.Route>
    {/* highlight-add-end */}
  </EntityLayout>
);
