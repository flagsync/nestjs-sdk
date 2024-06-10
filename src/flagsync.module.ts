import { DynamicModule, Global, Logger, Module } from '@nestjs/common';

import { FsConfig } from '@flagsync/node-sdk';
import { FlagSyncCoreModule } from './flagsync-core.module';
import { FlagSyncModuleAsyncOptions } from './types';

@Global()
@Module({})
export class FlagSyncModule {
  static forRoot(options: FsConfig): DynamicModule {
    return {
      module: FlagSyncModule,
      imports: [
        FlagSyncCoreModule.forRoot(options, new Logger(FlagSyncModule.name)),
      ],
    };
  }
  static forRootAsync(options: FlagSyncModuleAsyncOptions): DynamicModule {
    return {
      module: FlagSyncModule,
      imports: [
        FlagSyncCoreModule.forRootAsync(
          options,
          new Logger(FlagSyncModule.name),
        ),
      ],
    };
  }
}
