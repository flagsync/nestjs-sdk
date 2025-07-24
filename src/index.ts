export type {
  FsFlagSet,
  CustomAttributes,
  CustomAttributeValue,
  FsConfig,
  FsClient,
  LogLevel,
  FsUserContext,
  FeatureFlags,
  FsEvent,
  SyncType,
  NoExplicitReturnType,
  IsFeatureFlagsEmpty,
  FlagReturnType,
} from '@flagsync/node-sdk';

export { InjectFlagSync } from './decorators';
export { type FlagSyncModuleAsyncOptions } from './types';

export { FlagSyncModule } from './flagsync.module';
