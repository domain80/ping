import { createEvent, createError as h3CreateError } from 'h3'
import { IncomingMessage, ServerResponse } from 'http'
import { Socket } from 'net'
import { vi } from 'vitest'

// Stub Nuxt auto-imports
export function setupNuxtStubs() {
  vi.stubGlobal('defineEventHandler', (handler: (...args: unknown[]) => unknown) => handler)
  vi.stubGlobal('createError', h3CreateError)
  vi.stubGlobal('getQuery', (event: { node: { req: { url?: string } } }) => {
    const url = new URL(event.node.req.url ?? '/', 'http://localhost')
    return Object.fromEntries(url.searchParams)
  })
}

// Create mock H3 event
export function createMockEvent(options: { url?: string; query?: Record<string, string> } = {}) {
  const socket = new Socket()
  const req = new IncomingMessage(socket)
  const queryString = options.query ? `?${new URLSearchParams(options.query)}` : ''
  req.url = (options.url ?? '/') + queryString
  req.method = 'GET'
  const res = new ServerResponse(req)
  return createEvent(req, res)
}

// Create mock drizzle query chain
export function createMockDbChain<T>(result: T) {
  const mockOffset = vi.fn(() => Promise.resolve(result))
  const mockLimit = vi.fn(() => ({ offset: mockOffset }))
  const mockWhere = vi.fn(() => ({ limit: mockLimit }))
  const mockFrom = vi.fn(() => ({ where: mockWhere }))
  const mockSelect = vi.fn(() => ({ from: mockFrom }))

  return {
    select: mockSelect,
    from: mockFrom,
    where: mockWhere,
    limit: mockLimit,
    offset: mockOffset,
  }
}

export { h3CreateError }
