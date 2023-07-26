import { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <T>(path: string, options: UseFetchOptions<T> = {}) => {
  const request = useRequestURL()

  let headers: any = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    referer: request.origin,
  }

  const config = useRuntimeConfig()

  const token = useCookie('XSRF-TOKEN')

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
    }
  }

  return useFetch(path, {
    baseURL: config.public.BACKEND_URL,
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })
}
