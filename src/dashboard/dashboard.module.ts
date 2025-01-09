import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JwtService } from '@nestjs/jwt';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [DashboardController],
  providers: [DashboardService, JwtService]
})
export class DashboardModule {}
