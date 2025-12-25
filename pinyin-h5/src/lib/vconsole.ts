type VConsoleInstance = {
  destroy?: () => void
}

let instance: VConsoleInstance | null = null

// function hasParamInHash(key: string, value: string) {
//   const hash = window.location.hash
//   const queryIndex = hash.indexOf('?')
//   if (queryIndex === -1) return false
//   const params = new URLSearchParams(hash.slice(queryIndex + 1))
//   return params.get(key) === value
// }

// function shouldEnableVConsole() {
//   try {
//     const urlParams = new URLSearchParams(window.location.search)
//     if (urlParams.get('vconsole') === '1') return true
//     if (hasParamInHash('vconsole', '1')) return true
//     if (window.localStorage.getItem('vconsole') === '1') return true
//   } catch {
//     // ignore
//   }
//   return false
// }

export async function initVConsole() {
  if (instance) return instance
  // if (!import.meta.env.DEV && !shouldEnableVConsole()) return null

  const VConsole = (await import('vconsole')).default
  instance = new VConsole()
  return instance
}

