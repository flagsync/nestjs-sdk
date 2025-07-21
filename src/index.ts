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
} from '@flagsync/node-sdk';

export { InjectFlagSync } from './decorators';
export { type FlagSyncModuleAsyncOptions } from './types';

export { FlagSyncModule } from './flagsync.module';
