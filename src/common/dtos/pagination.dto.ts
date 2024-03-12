import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  //tranformar
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  //tranformar
  @Type(() => Number)
  offset?: number;
}
