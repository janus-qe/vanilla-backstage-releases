import { EntitySwitch } from '@backstage/plugin-catalog';
import {
  EntityGithubActionsContent,
  isGithubActionsAvailable,
} from '@backstage/plugin-github-actions';
import {
  isTektonCIAvailable,
  LatestPipelineRun,
} from '@janus-idp/backstage-plugin-tekton';
import {
  isArgocdAvailable,
  EntityArgoCDHistoryCard,
} from '@roadiehq/backstage-plugin-argo-cd';

import Grid from '@mui/material/Grid';
import React from 'react';

export const cicdContent = (
  <Grid container spacing={3}>
    <EntitySwitch>
      <EntitySwitch.Case if={isGithubActionsAvailable}>
        <Grid item xs={12}>
          <EntityGithubActionsContent />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
    <EntitySwitch>
      <EntitySwitch.Case if={isTektonCIAvailable}>
        <Grid item xs={12}>
          <LatestPipelineRun linkTekton />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
    <EntitySwitch>
      <EntitySwitch.Case if={isArgocdAvailable}>
        <Grid item xs={12}>
          <EntityArgoCDHistoryCard />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </Grid>
);
