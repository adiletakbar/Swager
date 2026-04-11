import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({

  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
      PrismaModule, UsersModule, TaskModule, BoardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard
    },
    {
      provide:'APP_GUARD',
      useClass:RolesGuard,
    },


  ],
})
export class AppModule {}
