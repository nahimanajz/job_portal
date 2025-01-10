import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class JobQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Number of jobs per page' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  pageSize?: number;

  @ApiPropertyOptional({ example: 'title', description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  @IsIn(['title', 'datePosted', 'location'], { message: 'SortBy must be title, datePosted, or location' })
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort order (asc or desc)' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], { message: 'SortOrder must be asc or desc' })
  sortOrder?: string;

  @ApiPropertyOptional({ example: 'Engineering', description: 'Filter by job category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'New York', description: 'Filter by job location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Carpenter ', description: 'Filter by job title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'loremdalsdklasd ', description: 'Filter by job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2025-01-01', description: 'Filter by jobs posted after this date' })
  @IsOptional()
  @IsDateString({}, { message: 'dateFrom must be a valid ISO date string' })
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2025-01-31', description: 'Filter by jobs posted before this date' })
  @IsOptional()
  @IsDateString({}, { message: 'dateTo must be a valid ISO date string' })
  dateTo?: string;
}
