import { useCallback } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import _ from 'lodash'

export const SearchParams = {
  PLAYLIST_ID: 'playlist'
}

export function useSearchParam(
  key: string,
  defaultValue: string | null = null
) {
  const [params, setParams] = useSearchParams()
  const value = params.get(key) || defaultValue

  type Options = {
    clear?: string[]
  }

  const setSearchParam = useCallback(
    (newValue, options?: Options) => {
      if (newValue === value) return

      const keysToClear = options?.clear

      const sp = createSearchParams(params)

      if (_.isNil(newValue)) {
        sp.delete(key)
      } else {
        sp.set(key, newValue)
      }

      _.forEach(keysToClear, key => sp.delete(key))

      setParams(sp)
    },
    [params, setParams]
  )

  return [value, setSearchParam] as const
}

export function getStringParam(url: URL, parameter: string): string | null {
  return url.searchParams.get(parameter)
}
