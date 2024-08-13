import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminRouteModule } from './router/routes/admin-route/admin-route.module';
import { UserRouterModule } from './router/routes/user-route/user-route.module';

export function swaggerSetup(app: INestApplication<any>) {
  // ============================== Admin Docs ============================== \\
  const adminDocConfig = new DocumentBuilder()
    .setTitle('Admin Doc')
    .setDescription('This is APIs for Admin to controller')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminDocConfig, {
    include: [AdminRouteModule],
  });

  SwaggerModule.setup('admin-docs', app, adminDocument, {
    swaggerOptions: {
      //Add this for preserve auth token in local storage (Refreshing page will not remove token from swagger)
      persistAuthorization: true,
    },
  });

  // ============================== User Docs ============================== \\
  const userDocConfig = new DocumentBuilder()
    .setTitle('User Doc')
    .setDescription('This is APIs for User')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .build();

  const userDocument = SwaggerModule.createDocument(app, userDocConfig, {
    include: [UserRouterModule],
  });

  SwaggerModule.setup('user-docs', app, userDocument, {
    swaggerOptions: {
      //Add this for preserve auth token in local storage (Refreshing page will not remove token from swagger)
      persistAuthorization: true,
    },
  });
}
