<script setup lang="ts">
import { useSpeak } from '@/composables/useSpeak';
import { getCnchar } from '@/lib/cnchar';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string
    items: string[]
  }>(),
  {
    modelValue: '',
    items: () => [],
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const cnchar = getCnchar()

const drawEl = ref<HTMLElement | null>(null)

const hanzi = computed(() => props.modelValue)

const { speak } = useSpeak({
  engine: 'cnchar',
  webRate: 1,
})

const pinyin = computed(() => {
  if (!hanzi.value) return ''
  try {
    return cnchar.spell(hanzi.value, 'tone', 'low')
  } catch {
    return ''
  }
})

const currentIndex = computed(() => {
  if (!props.items.length) return -1
  const idx = props.items.indexOf(hanzi.value)
  return idx >= 0 ? idx : 0
})

function go(offset: number) {
  const list = props.items
  if (!list.length) return
  const idx = currentIndex.value
  const nextIndex = (idx + offset + list.length) % list.length
  const next = list[nextIndex] ?? list[0]
  if (!next) return
  emit('update:modelValue', next)
  speak(next)
}

function prev() {
  go(-1)
}

function next() {
  go(1)
}

function play() {
  if (!drawEl.value) return
  if (!hanzi.value) return
  if (typeof cnchar.draw !== 'function') return

  const rect = drawEl.value.getBoundingClientRect()
  const length = Math.max(1, Math.floor(Math.min(rect.width, rect.height)))
  const padding = Math.floor(length * 0.12)

  drawEl.value.innerHTML = ''

  cnchar.draw(hanzi.value, {
    el: drawEl.value,
    type: cnchar.draw.TYPE.ANIMATION,
    clear: true,
    style: {
      backgroundColor: 'transparent',
      showOutline: true,
      showCharacter: false,
      length,
      padding,
      outlineColor: '#d0d0d0',
      strokeColor: '#2c3e50',
      strokeFadeDuration: 220,
    },
    line: {
      lineStraight: true,
      lineCross: true,
      lineDash: true,
      border: true,
      borderColor: '#bfbfbf',
      lineColor: '#d9d9d9',
    },
    animation: {
      strokeAnimationSpeed: 0.5,
      delayBetweenStrokes: 140,
      loopAnimate: true,
      delayBetweenLoops: 600,
      autoAnimate: true,
    },
  })
}

watch(
  () => hanzi.value,
  async () => {
    await nextTick()
    play()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (drawEl.value) drawEl.value.innerHTML = ''
})
</script>

<template>
  <div class="study">
    <div class="pinyin-row">
      <div class="pinyin">{{ pinyin }}</div>
    </div>
    <div class="write-area-box">
      <!-- 上一个 -->
      <van-button icon="arrow-double-left"  @click="prev" />
      <div class="writer">
        <div ref="drawEl" class="draw" />
      </div>
      <!-- 下一个 -->
      <van-button icon="arrow-double-right"  @click="next" />
    </div>
  </div>
</template>

<style scoped>
.study {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.pinyin-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.no-border {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.pinyin {
  font-size: 44px;
  line-height: 1;
}

.write-area-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.writer {
  width: 180px;
  aspect-ratio: 1 / 1;
}

.draw {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
