import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnModuleDestroy,
  Provider,
} from '@nestjs/common';

import { FsConfig, FlagSyncFactory, FsClient } from '@flagsync/node-sdk';
import { FlagSyncModuleAsyncOptions } from './types';
import { ModuleRef } from '@nestjs/core';
import { FLAGSYNC_CLIENT, FLAGSYNC_CONFIG } from './constants';

@Global()
@Module({})
export class FlagSyncCoreModule implements OnModuleDestroy {
  constructor(private moduleRef: ModuleRef) {}

  static forRoot(config: FsConfig, logger: Logger): DynamicModule {
    return {
      module: FlagSyncCoreModule,
      providers: [
        {
          provide: FLAGSYNC_CLIENT,
          useFactory: async () => {
            const factory = FlagSyncFactory({
              ...config,
              logger: FlagSyncCoreModule.buildLogger(logger),
              metadata: {
                sdkName: '__SDK_VERSION__',
                sdkVersion: '__SDK_NAME__',
              },
            });
            const client = factory.client();
            await client.waitForReady();
            return client;
          },
        },
      ],
      exports: [FLAGSYNC_CLIENT],
    };
  }

  static forRootAsync(
    options: FlagSyncModuleAsyncOptions,
    logger: Logger,
  ): DynamicModule {
    const clientProvider = {
      provide: FLAGSYNC_CLIENT,
      useFactory: async (config: FsConfig): Promise<any> => {
        const factory = FlagSyncFactory({
          ...config,
          logger: FlagSyncCoreModule.buildLogger(logger),
          metadata: {
            sdkName: '__SDK_VERSION__',
            sdkVersion: '__SDK_NAME__',
          },
        });
        const client = factory.client();
        await client.waitForReady();
        return client;
      },
      inject: [FLAGSYNC_CONFIG],
    };

    const asyncProvider = this.createAsyncProvider(options);

    return {
      module: FlagSyncCoreModule,
      imports: options.imports,
      providers: [asyncProvider, clientProvider],
      exports: [clientProvider],
    };
  }

  private static createAsyncProvider(
    options: FlagSyncModuleAsyncOptions,
  ): Provider {
    return this.createAsyncOptionsProvider(options);
  }

  private static createAsyncOptionsProvider(
    options: FlagSyncModuleAsyncOptions,
  ): Provider {
    return {
      provide: FLAGSYNC_CONFIG,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  async onModuleDestroy() {
    const client = this.moduleRef.get<FsClient>(FLAGSYNC_CLIENT);
    if (client) {
      await client.destroy();
    }
  }

  private static buildLogger(logger: Logger) {
    return {
      info: (message: any, ...optionalParams: [...any, string?, string?]) =>
        logger.log(message, ...optionalParams),
      log: (message: any, ...optionalParams: [...any, string?, string?]) =>
        logger.log(message, ...optionalParams),
      debug: (message: any, ...optionalParams: [...any, string?, string?]) =>
        logger.debug(message, ...optionalParams),
      warn: (message: any, ...optionalParams: [...any, string?, string?]) =>
        logger.warn(message, ...optionalParams),
      error: (message: any, ...optionalParams: [...any, string?, string?]) =>
        logger.error(message, ...optionalParams),
    };
  }
}
