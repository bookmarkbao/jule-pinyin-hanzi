import { ensureCncharVoice } from '@/lib/cnchar'
import type { IVoiceOptions, IVoicePlayer } from 'cnchar-types/plugin/voice/index'
import { computed, ref } from 'vue'

export type SpeakEngine = 'web' | 'cnchar'

export type UseSpeakOptions = {
  engine?: SpeakEngine
  cncharVoiceOptions?: IVoiceOptions
  webRate?: number
}

export function useSpeak(options: UseSpeakOptions = {}) {
  const engine = ref<SpeakEngine>(options.engine ?? 'cnchar')

  const webSupported = computed(
    () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
  )

  const cncharSupported = computed(() => {
    try {
      const cnchar = ensureCncharVoice()
      return typeof cnchar.voice === 'function'
    } catch {
      return false
    }
  })

  let currentPlayer: IVoicePlayer | null = null

  function stop() {
    if (currentPlayer) {
      try {
        currentPlayer.stop()
      } catch {
        // ignore
      }
      currentPlayer = null
    }

    if (webSupported.value) {
      try {
        window.speechSynthesis.cancel()
      } catch {
        // ignore
      }
    }

  }

  function speakWeb(text: string): SpeechSynthesisUtterance | null {
    if (!webSupported.value) return null
    try {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'zh-CN'
      utter.rate = options.webRate ?? 0.85
      window.speechSynthesis.speak(utter)
      return utter
    } catch {
      return null
    }
  }

  function speakCnchar(text: string): IVoicePlayer | null {
    try {
      const cnchar = ensureCncharVoice()
      if (typeof cnchar.voice !== 'function') return null
      const player = cnchar.voice(text, {
        autoStart: true,
        loop: false,
        rate: 1,
        volume: 1,
        ...options.cncharVoiceOptions,
      })
      currentPlayer = player
      return player
    } catch {
      return null
    }
  }

  function speak(text: string) {
    stop()
    const trimmed = text.trim()
    if (!trimmed) return null

    if (engine.value === 'cnchar') {
      return speakCnchar(trimmed) ?? speakWeb(trimmed)
    }

    if (engine.value === 'web') {
      return speakWeb(trimmed)
    }

    return null
  }

  function setEngine(next: SpeakEngine) {
    engine.value = next
    stop()
  }

  return {
    engine,
    setEngine,
    speak,
    stop,
    webSupported,
    cncharSupported,
  }
}
