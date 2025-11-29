import dayjs from 'dayjs'
import { authClient } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth middleware for login page itself
  if (to.name === 'login' || to.path === '/login') {
    return
  }

  // Here we call `authClient.useSession` with `useFetch` as an argument,
  // which tells the auth client to use Nuxt's `useFetch` composable for managing
  // data fetching and reactivity. This way, session state is automatically kept up to date
  // with Nuxt's fetch lifecycle and SSR-friendly cache. If you omit the argument,
  // the client might use a default (non-Nuxt) fetcher and lose some reactivity or SSR benefits.
  const { data: session } = await authClient.useSession(useFetch)

  const expiresAt = session?.value?.session?.expiresAt
  if (!expiresAt || dayjs().isAfter(dayjs(expiresAt))) {
    return navigateTo(
      { name: 'login', query: { redirect: to.fullPath } },
      {
        // We use a 302 (Found) status code here instead of 401 (Unauthorized)
        // because 401 is intended for API responses where the client can handle authentication,
        // while 302 tells browsers to perform a redirect to the login page as part of the user flow.
        // Using 302 improves user experience for web navigation.
        redirectCode: 302,
      }
    )
  }
})
