import { FsConfig } from '@flagsync/node-sdk';
import { ModuleMetadata } from '@nestjs/common';

export interface FlagSyncModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<FsConfig>;
  inject?: any[];
}
