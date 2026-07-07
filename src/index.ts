export type {
  FsFlagSet,
  CustomAttributes,
  CustomAttributeValue,
  FsConfig,
  FsClient,
  LogLevel,
  FsUserContext,
  FeatureFlags,
  NoExplicitReturnType,
  IsFeatureFlagsEmpty,
  FlagReturnType,
} from '@flagsync/node-sdk';

/**
 * Runtime values, not types — a type-only re-export compiles fine but leaves
 * them undefined at runtime (e.g. `SyncType.Sse` throwing at module init).
 */
export { FsEvent, SyncType } from '@flagsync/node-sdk';

export { InjectFlagSync } from './decorators';
export { type FlagSyncModuleAsyncOptions } from './types';

export { FlagSyncModule } from './flagsync.module';
