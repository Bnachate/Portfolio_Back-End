import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';
@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      take: paginationQueryDto.limit,
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
    });
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseURL);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
    const nextPage =
      paginationQueryDto.page < totalPages ? paginationQueryDto.page + 1 : null;
    const previousPage =
      paginationQueryDto.page > 1 ? paginationQueryDto.page - 1 : null;
    const finalReponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: paginationQueryDto.page,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${paginationQueryDto.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${previousPage}`,
      },
    };
    return finalReponse;
  }
}
