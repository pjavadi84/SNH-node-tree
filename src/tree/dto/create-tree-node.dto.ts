import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTreeNodeDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentId?: number | null;
}
