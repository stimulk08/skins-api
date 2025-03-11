import postgres from 'postgres';

import { configService } from '@libs/config/config.service';

export const sql = postgres(configService.get('DATABASE_URL', 'string'), {});
