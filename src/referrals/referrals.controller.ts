import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Post()
  create(@Body() createReferralDto: CreateReferralDto) {
    return this.referralsService.create(createReferralDto);
  }

  @Get()
  findAll() {
    return this.referralsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferralDto: UpdateReferralDto) {
    return this.referralsService.update(+id, updateReferralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralsService.remove(+id);
  }
}
