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
    location
  } = query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const where: any = {};

  // Add filters
  if (status) {
    where.status = status;
  }
  if(location){
    where.job = where.job || {}; 
    where.job.location = {contains: location, mode: "insensitive"}
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
    title,
    description
  } = query;

    const skip = (Number(page) - 1) * Number(pageSize);
    const where: any = {};
    if (category) {
      where.category = { contains: category, mode: "insensitive"  };
    }
    if (location) {
      where.location = { contains: location, mode: "insensitive"  };
    }
    if (description) {
      where.description = { contains: description, mode: "insensitive"  };
    }
    if (title) {
      where.description = { contains: title, mode: "insensitive"  };
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
