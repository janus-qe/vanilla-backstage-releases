import { CatalogClient } from '@backstage/catalog-client';
import {
  createRouter,
  createBuiltinActions,
} from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';

import { ScmIntegrations } from '@backstage/integration';
import type { PluginEnvironment } from '../types';
import { createKubernetesNamespaceAction } from '@janus-idp/backstage-scaffolder-backend-module-kubernetes';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });

  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });

  const actions = [
    ...builtInActions,
    createKubernetesNamespaceAction(catalogClient),
  ];

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    permissions: env.permissions,
  });
}
