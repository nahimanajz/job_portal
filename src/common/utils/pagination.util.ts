import { ApplicationQueryDto } from 'src/application/dto/query-application.dto';
import { JobQueryDto } from 'src/job/dto/job-query.dto';

export const paginateApplication = (query: ApplicationQueryDto) => {
  const {
    page = 1,
    pageSize = 10,
    sortBy,
    sortOrder,
    status,
    dateFrom,
    dateTo,
  } = query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const where: any = {};

  // Add filters
  if (status) {
    where.status = status;
  }
  if (dateFrom || dateTo) {
    where.dateApplied = {
      ...(dateFrom && { gte: new Date(dateFrom) }),
      ...(dateTo && { lte: new Date(dateTo) }),
    };
  }
  // sorting
  // Add sorting
  const orderBy = {};
  if (sortBy === 'date') {
    orderBy['dateApplied'] = sortOrder;
  } else if (sortBy === 'status') {
    orderBy['status'] = sortOrder;
  } else if (sortBy === 'user') {
    orderBy['user'] = { email: sortOrder };
  }

  return {
    where,
    orderBy,
    skip: Number(skip),
    pageSize: Number(pageSize),
    currentPage: Number(page),
  };
};

export const paginateJobs = (query: JobQueryDto) => {
  const {
    page=1 ,
    pageSize=10,
    sortBy = 'datePosted',
    sortOrder = 'desc',
    category,
    location,
    dateFrom,
    dateTo,
  } = query;

    const skip = (Number(page) - 1) * Number(pageSize);
    const where: any = {};
    if (category) {
      where.category = { equals: category };
    }
    if (location) {
      where.location = { equals: location };
    }
    if (dateFrom) {
      where.datePosted = { gte: new Date(dateFrom) };
    }
    if (dateTo) {
      where.datePosted = { lte: new Date(dateTo) };
    }

    // Build the orderBy clause
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

  return {where, orderBy, skip, pageSize, currentPage: Number(page)}
};
