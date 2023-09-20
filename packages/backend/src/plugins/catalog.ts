import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { AapResourceEntityProvider } from '@janus-idp/backstage-plugin-aap-backend';
import {
  KeycloakOrgEntityProvider,
  GroupTransformer,
  UserTransformer,
} from '@janus-idp/backstage-plugin-keycloak-backend';
import { ManagedClusterProvider } from '@janus-idp/backstage-plugin-ocm-backend';
import { ThreeScaleApiEntityProvider } from '@janus-idp/backstage-plugin-3scale-backend';

/**
 * User transformer that sanitizes .metadata.name from email address to a valid name with at most 62 characters
 */
export const sanitizeEmailTransformer: UserTransformer = async (
  entity,
  _user,
  _realm,
  _groups,
) => {
  entity.metadata.name = entity.metadata.name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .substring(0, 63);
  return entity;
};

/**
 * Group transformer that sanitizes .metadata.name to a valid name with at most 62 characters
 */
export const groupTransformer: GroupTransformer = async (
  entity,
  _group,
  _realm,
) => {
  entity.metadata.name = entity.metadata.name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .substring(0, 63);
  return entity;
};

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);

  const isKeycloakEnabled =
    env.config.getOptionalBoolean('enabled.keycloak') || false;
  const isAnsibleEnabled =
    env.config.getOptionalBoolean('enabled.ansible') || false;
  const isOcmEnabled = env.config.getOptionalBoolean('enabled.ocm') || false;
  const is3ScaleEnabled =
    env.config.getOptionalBoolean('enabled.threescale') || false;

  if (isAnsibleEnabled) {
    builder.addEntityProvider(
      AapResourceEntityProvider.fromConfig(env.config, {
        logger: env.logger,
        schedule: env.scheduler.createScheduledTaskRunner({
          frequency: { minutes: 1 },
          timeout: { minutes: 1 },
        }),
      }),
    );
  }

  if (isKeycloakEnabled) {
    builder.addEntityProvider(
      KeycloakOrgEntityProvider.fromConfig(env.config, {
        id: 'development',
        logger: env.logger,
        schedule: env.scheduler.createScheduledTaskRunner({
          frequency: { minutes: 1 },
          timeout: { minutes: 1 },
          initialDelay: { seconds: 15 },
        }),
        userTransformer: sanitizeEmailTransformer,
        groupTransformer,
      }),
    );
  }
  if (isOcmEnabled) {
    builder.addEntityProvider(
      ManagedClusterProvider.fromConfig(env.config, {
        logger: env.logger,
        schedule: env.scheduler.createScheduledTaskRunner({
          frequency: { minutes: 1 },
          timeout: { minutes: 1 },
          initialDelay: { seconds: 15 },
        }),
      }),
    );
  }
  if (is3ScaleEnabled) {
    builder.addEntityProvider(
      ThreeScaleApiEntityProvider.fromConfig(env.config, {
        logger: env.logger,
        scheduler: env.scheduler,
      }),
    );
  }

  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
