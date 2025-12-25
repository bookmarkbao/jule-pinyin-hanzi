<script setup lang="ts">
import TianZiGeCell from '@/components/TianZiGeCell.vue';

const props = withDefaults(
  defineProps<{
    items: Array<{ h: string; p?: string }>
    columns?: number
    modelValue?: string
  }>(),
  {
    columns: 5,
    modelValue: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div
    class="line"
    :style="{
      gridTemplateColumns: `repeat(${columns}, var(--cell))`,
    }"
  >
    <TianZiGeCell
      v-for="it in items"
      :key="it.h"
      :hanzi="it.h"
      :pinyin="it.p"
      :selected="it.h === props.modelValue"
      @select="emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped>
.line {
  display: grid;
  gap: var(--gap);
}
</style>
