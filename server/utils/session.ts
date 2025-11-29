import type { H3Event } from 'h3'
import { auth } from '~~/lib/auth'

export type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

export async function getValidSession(event: H3Event): Promise<Session> {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.session || !session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return session
}
