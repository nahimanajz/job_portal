import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsIn, IsDateString } from 'class-validator';

export class ApplicationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Number of items per page' })
  @IsOptional()

  pageSize?: number;

  @ApiPropertyOptional({ example: "City 9", description: 'Enter job location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'date', description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  @IsIn(['date', 'status', 'user'], { message: 'SortBy must be one of date, status, or user' })
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort order (asc or desc)' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], { message: 'SortOrder must be asc or desc' })
  sortOrder?: string;

  @ApiPropertyOptional({ example: 'Accepted', description: 'Filter by application status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: '2025-01-01', description: 'Filter by start date' })
  @IsOptional()
  @IsDateString({}, { message: 'dateFrom must be a valid ISO date string' })
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2025-01-31', description: 'Filter by end date' })
  @IsOptional()
  @IsDateString({}, { message: 'dateTo must be a valid ISO date string' })
  dateTo?: string;
}
