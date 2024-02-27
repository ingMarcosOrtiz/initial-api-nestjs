import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { ReferralsController } from './referrals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from './entities/referral.entity';

@Module({
  controllers: [ReferralsController],
  providers: [ReferralsService],
  imports: [TypeOrmModule.forFeature([Referral])],
})
export class ReferralsModule {}
