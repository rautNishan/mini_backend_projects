import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminRouteModule } from './routes/admin-route/admin-route.module';

@Module({
  imports: [
    AdminRouteModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminRouteModule,
      },
    ]),
  ],
})
export class CustomRouterModule {}
