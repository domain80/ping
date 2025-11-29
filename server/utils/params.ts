import type { H3Event } from 'h3'

export function ensureParam(event: H3Event, { name }: { name: string; required?: boolean }) {
  const param = getRouterParam(event, name)

  if (!param) {
    throw createError({
      statusCode: 400,
      message: `${name} is required`,
    })
  }

  return param
}
