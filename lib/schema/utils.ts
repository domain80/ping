import { sql } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
}

export function generateId(prefix?: string) {
  return prefix ? `${prefix}_${nanoid()}` : nanoid(32)
}

export function tableId(prefix: string) {
  return {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => generateId(prefix)),
  }
}
