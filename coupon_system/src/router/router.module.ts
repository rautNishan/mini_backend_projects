import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminRouteModule } from './routes/admin-route/admin-route.module';
import { UserRouterModule } from './routes/user-route/user-route.module';

@Module({
  imports: [
    AdminRouteModule,
    UserRouterModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminRouteModule,
      },
      {
        path: 'user',
        module: UserRouterModule,
      },
    ]),
  ],
})
export class CustomRouterModule {}
