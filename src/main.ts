import { swagger } from '@elysiajs/swagger';
import Elysia from 'elysia';

import 'tsconfig-paths/register';
import { configService } from '@libs/config/config.service';
import { initRouters } from '@src/routes';

async function bootstrap(): Promise<void> {
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
