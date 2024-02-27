import { Injectable } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';

@Injectable()
export class ReferralsService {
  create(createReferralDto: CreateReferralDto) {
    return 'This action adds a new referral';
  }

  findAll() {
    return `This action returns all referrals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referral`;
  }

  update(id: number, updateReferralDto: UpdateReferralDto) {
    return `This action updates a #${id} referral`;
  }

  remove(id: number) {
    return `This action removes a #${id} referral`;
  }
}
