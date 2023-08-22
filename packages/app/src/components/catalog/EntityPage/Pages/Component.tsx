import React from 'react';
import {
  EntityProvidedApisCard,
  EntityConsumedApisCard,
} from '@backstage/plugin-api-docs';
import {
  EntityLayout,
  EntitySwitch,
  EntityDependsOnComponentsCard,
  EntityDependsOnResourcesCard,
  isComponentType,
} from '@backstage/plugin-catalog';
import { EntityKubernetesContent } from '@backstage/plugin-kubernetes';
import { isAcrAvailable, AcrPage } from '@janus-idp/backstage-plugin-acr';
import {
  isJfrogArtifactoryAvailable,
  JfrogArtifactoryPage,
} from '@janus-idp/backstage-plugin-jfrog-artifactory';
import { isQuayAvailable, QuayPage } from '@janus-idp/backstage-plugin-quay';
import { TektonPage } from '@janus-idp/backstage-plugin-tekton';
import { TopologyPage } from '@janus-idp/backstage-plugin-topology';
import { Grid } from '@material-ui/core';
import { cicdContent } from '../Content/CI-CD';
import { overviewContent } from '../Content/Overview';
import { techdocsContent } from '../Content/Techdocs';
import { defaultEntityPage } from './DefaultEntity';

const systemOrWebsitePage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage />
    </EntityLayout.Route>
    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000} />
    </EntityLayout.Route>
    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/tekton" title="Tekton">
      <TektonPage />
    </EntityLayout.Route>
    <EntityLayout.Route if={isQuayAvailable} path="/quay" title="Quay">
      <QuayPage />
    </EntityLayout.Route>
    <EntityLayout.Route path="/acr" title="ACR">
      <Grid container spacing={3} alignItems="stretch">
        <EntitySwitch>
          <EntitySwitch.Case if={isAcrAvailable}>
            <Grid item sm={12}>
              <AcrPage />
            </Grid>
          </EntitySwitch.Case>
        </EntitySwitch>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route
      if={isJfrogArtifactoryAvailable}
      path="/jfrog-artifactory"
      title="Jfrog Artifactory"
    >
      <JfrogArtifactoryPage />
    </EntityLayout.Route>
    <EntityLayout.Route path="/api" title="API">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityProvidedApisCard />
        </Grid>
        <Grid item md={6}>
          <EntityConsumedApisCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityDependsOnComponentsCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityDependsOnResourcesCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>
  </EntityLayout>
);

export const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType(['service', 'website'])}>
      {systemOrWebsitePage}
    </EntitySwitch.Case>
    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
