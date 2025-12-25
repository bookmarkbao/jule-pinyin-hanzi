import { createWxShare, type ShareConfig, type SignConfigResponse } from '@tsdanci/wx-share'

type UseWxShareOptions = {
  debug?: boolean
  signApiUrl?: string
  fromShareKey?: string
  fromShareValue?: string
}

function hasQueryParamInHash(hash: string, key: string, value?: string) {
  const trimmed = hash.startsWith('#') ? hash.slice(1) : hash
  const queryIndex = trimmed.indexOf('?')
  if (queryIndex === -1) return false
  const query = trimmed.slice(queryIndex + 1)
  const params = new URLSearchParams(query)
  const current = params.get(key)
  if (value == null) return current != null
  return current === value
}

export function checkParamInUrl(url: string, key: string, value?: string) {
  try {
    const parsed = new URL(url)
    const current = parsed.searchParams.get(key)
    if (value == null) {
      return current != null || hasQueryParamInHash(parsed.hash, key)
    }
    return current === value || hasQueryParamInHash(parsed.hash, key, value)
  } catch {
    return url.includes(value == null ? `${key}=` : `${key}=${value}`)
  }
}

export function addParamToUrl(url: string, key: string, value: string) {
  if (checkParamInUrl(url, key, value)) return url

  const hashIndex = url.indexOf('#')
  if (hashIndex !== -1) {
    const base = url.slice(0, hashIndex)
    const hash = url.slice(hashIndex + 1)
    if (!hash) return `${base}#?${key}=${encodeURIComponent(value)}`
    if (hash.includes('?')) return `${base}#${hash}&${key}=${encodeURIComponent(value)}`
    return `${base}#${hash}?${key}=${encodeURIComponent(value)}`
  }

  if (url.includes('?')) return `${url}&${key}=${encodeURIComponent(value)}`
  return `${url}?${key}=${encodeURIComponent(value)}`
}

export function getWxSignUrl() {
  const { origin, pathname, search } = window.location
  return `${origin}${pathname}${search}`
}

export function useWxShare(options: UseWxShareOptions = {}) {
  const wxShare = createWxShare()
  const signApiUrl = options.signApiUrl ?? import.meta.env.VITE_WX_SHARE_SIGN_API ?? '/api/v2/wx-share'
  const fromShareKey = options.fromShareKey ?? 'fromShare'
  const fromShareValue = options.fromShareValue ?? '1'
  let lastShareConfig: ShareConfig | null = null

  function buildShareLink(rawUrl = window.location.href) {
    return addParamToUrl(rawUrl, fromShareKey, fromShareValue)
  }

  async function initWxShare(config: ShareConfig) {
    const shareConfig: ShareConfig = {
      ...config,
      link: config.link ? buildShareLink(config.link) : buildShareLink(),
    }
    lastShareConfig = shareConfig

    const debug = options.debug ?? false

    try {
      await wxShare
        .setDebug(debug)
        .setShareOptions(shareConfig)
        .setCustomFetch(async (apiUrl: string): Promise<SignConfigResponse> => {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: getWxSignUrl() }),
          })
          return res.json()
        })
        .fetchSignConfigAndShare({ url: signApiUrl })
    } catch (error) {
      console.error('微信分享初始化错误:', error)
    }
  }

  function refreshWxShare(config: ShareConfig = {}) {
    if (!lastShareConfig) return

    const next: ShareConfig = {
      ...lastShareConfig,
      ...config,
    }

    next.link = next.link ? buildShareLink(next.link) : buildShareLink()
    try {
      wxShare.setShareInfo(next)
    } catch {
      // ignore
    }
  }

  function isFromShare() {
    return checkParamInUrl(window.location.href, fromShareKey, fromShareValue)
  }

  return {
    initWxShare,
    refreshWxShare,
    buildShareLink,
    isFromShare,
  }
}
