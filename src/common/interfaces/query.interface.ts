export interface IQuery {
    page?: number;
    pageSize?: number;
    sortBy?: 'date' | 'status' | 'user';
    sortOrder?: 'asc' | 'desc';
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }