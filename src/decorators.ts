import { Inject } from '@nestjs/common';

import { FLAGSYNC_CLIENT } from './constants';

export const InjectFlagSync = (): ReturnType<typeof Inject> =>
  Inject(FLAGSYNC_CLIENT);
