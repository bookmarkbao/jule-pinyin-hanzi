import cnchar from 'cnchar'
import draw from 'cnchar-draw'
import voice from 'cnchar-voice'

let drawInstalled = false
let voiceInstalled = false

export function getCnchar() {
  if (!drawInstalled) {
    cnchar.use(draw)
    drawInstalled = true
  }
  return cnchar
}

export function ensureCncharVoice() {
  const c = getCnchar()
  if (!voiceInstalled) {
    c.use(voice)
    voiceInstalled = true
  }
  return c
}
