import { swagger } from '@elysiajs/swagger';
import Elysia from 'elysia';
import postgres from 'postgres';

import 'tsconfig-paths/register';
import { ProductRepository } from '@apps/products/database/produtcs.repository';
import { PurchaseRepository } from '@apps/purchase/database/purchase.repository';
import { UserRepository } from '@apps/users/database/user.repository';
import { configService } from '@libs/config/config.service';
import { initRouters } from '@src/routes';

async function initTables(): Promise<void> {
  const connection = postgres(configService.get('DATABASE_URL', 'string'), {});
  await UserRepository.createTable(connection);
  await ProductRepository.createTable(connection);
  await PurchaseRepository.createTable(connection);
}

async function bootstrap(): Promise<void> {
  await initTables();
  const port = configService.get('PORT', 'number');
  const app = new Elysia();
  const swaggerPrefix = '/api/swagger';

  app
    .use(initRouters)
    .use(
      swagger({
        path: swaggerPrefix, // endpoint which swagger will appear on
        documentation: {
          info: {
            title: 'Skins API',
            version: '1.0.0',
          },
        },
      }),
    )
    .listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(
        `Swagger is running on http://localhost:${port}${swaggerPrefix}`,
      );
    });
}

bootstrap();
