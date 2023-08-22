import { EntityLayout } from '@backstage/plugin-catalog';
import React from 'react';
import { overviewContent } from '../Content/Overview';
import { techdocsContent } from '../Content/Techdocs';

export const defaultEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>
  </EntityLayout>
);
