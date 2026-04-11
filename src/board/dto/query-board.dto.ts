import { IsEnum, IsInt, IsIn, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from 'src/generated/prisma/enums'; 

export class QueryMoviesDto {
  // --- PAGINATION ---
  @IsOptional()
  @Type(() => Number)   // converts query string "2" → number 2
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;




  @IsOptional()
  @IsString()
  title?: string;

  // --- SORTING ---
  @IsOptional()
  @IsIn(['title','createdAt'])
  sortBy?: 'title' | 'createdAt' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}