<script setup lang="ts">
import { useSpeak } from '@/composables/useSpeak';
import { getCnchar } from '@/lib/cnchar';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    hanzi: string
    pinyin?: string
    selected?: boolean
  }>(),
  {
    pinyin: undefined,
    selected: false,
  },
)

const emit = defineEmits<{
  (e: 'select', hanzi: string): void
}>()
const { speak } = useSpeak({
  engine: 'cnchar',
  webRate: 1,
})
const cnchar = getCnchar()

const displayPinyin = computed(() => {
  if (props.pinyin) return props.pinyin
  try {
    return cnchar.spell(props.hanzi, 'tone', 'low')
  } catch {
    return ''
  }
})

function onClick() {
  speak(props.hanzi)
  emit('select', props.hanzi)
}
</script>

<template>
  <div class="item" :class="{ selected }" role="button" tabindex="0" @click="onClick">
    <div class="pinyin">{{ displayPinyin }}</div>
    <div class="tianzige">
      <div class="hanzi">{{ hanzi }}</div>
    </div>
  </div>
</template>

<style scoped>
.item {
  width: var(--cell);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.item.selected .tianzige {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
}

.pinyin {
  text-align: center;
  font-size: var(--pinyin);
  margin-bottom: 6px;
  line-height: 1.2;
}

.tianzige {
  width: var(--cell);
  height: var(--cell);
  border: 1px solid var(--grid-strong);
  display: grid;
  place-items: center;
  position: relative;
  background:
    linear-gradient(to bottom,
      transparent calc(50% - 0.5px),
      var(--grid) calc(50% - 0.5px),
      var(--grid) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)),
    linear-gradient(to right,
      transparent calc(50% - 0.5px),
      var(--grid) calc(50% - 0.5px),
      var(--grid) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)),
    linear-gradient(45deg,
      transparent calc(50% - 0.5px),
      var(--grid) calc(50% - 0.5px),
      var(--grid) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)),
    linear-gradient(-45deg,
      transparent calc(50% - 0.5px),
      var(--grid) calc(50% - 0.5px),
      var(--grid) calc(50% + 0.5px),
      transparent calc(50% + 0.5px));
}

.hanzi {
  font-size: var(--hanzi);
  font-weight: 600;
  line-height: 1;
  position: relative;
  z-index: 1;
}
</style>
