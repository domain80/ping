import type { SQL } from 'drizzle-orm'
import { count } from 'drizzle-orm'
import type { SQLiteTable } from 'drizzle-orm/sqlite-core'
import type { H3Event } from 'h3'
import { db } from '~~/lib/db'

export interface PaginationParams {
  page: number
  limit: number
  offset: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

export function getPaginationParams(event: H3Event): PaginationParams {
  const query = getQuery(event)

  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit as string) || DEFAULT_LIMIT))
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

export async function countRows<T extends SQLiteTable>(table: T, where?: SQL): Promise<number> {
  const result = await db.select({ count: count() }).from(table).where(where)

  return result[0]?.count ?? 0
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  { page, limit }: Pick<PaginationParams, 'page' | 'limit'>
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit)

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}
