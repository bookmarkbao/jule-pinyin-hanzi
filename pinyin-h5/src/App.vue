<script setup lang="ts">
import TianZiGeGrid from '@/components/TianZiGeGrid.vue'
import TianZiGeWriter from '@/components/TianZiGeWriter.vue'
import { useWxShare } from '@/composables/useWxShare'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const demoLines: Array<string[]> = [
  // 第一课
  ['一', '二', '工', '十', '干'],
  ['三', '王', '土', '上', '丰'],

  // 第二课
  ['厂', '开', '午', '牛', '禾'],
  ['人', '大', '木', '本', '天'],

  // 第三课
  ['六', '立', '主', '文', '广'],
  ['头', '平', '半', '兰', '来'],

  // 第四课
  ['口', '五', '右', '中', '贝'],
  ['尺', '尸', '见', '且', '京'],

  // 第五课
  ['刀', '力', '方', '巾', '月'],
  ['门', '勺', '白', '田', '冈'],

  // 第六课
  ['丁', '小', '寸', '于', '可'],
  ['习', '北', '勺', '以', '民'],

  // 第七课
  ['儿', '七', '元', '毛', '也'],
  ['无', '兄', '电', '巴', '四'],

  // 第八课
  ['云', '去', '么', '车', '东'],
  ['水', '夕', '又', '久', '友'],

  // 第九课
  ['山', '牙', '乙', '乐', '区'],
  ['鸟', '乌', '写', '与', '马'],

  // 第十课
  ['九', '几', '凡', '丸', '亢'],
  ['了', '子', '皮', '买', '家'],
]

const current = ref(demoLines[0]?.[0] || '')
const flatItems = computed(() => demoLines.flat().map((h) => ({ h })))
const flatHanzi = computed(() => demoLines.flat())

const { initWxShare, refreshWxShare } = useWxShare({
  debug: import.meta.env.DEV,
  signApiUrl: import.meta.env.VITE_WX_SHARE_SIGN_API,
})

const refreshWxShareOnNav = () => refreshWxShare()

onMounted(() => {
  initWxShare({
    title: '幼小衔接汉字练习：田字格描红 + 发音',
    desc: '幼儿园/小学生专用汉字学习：田字格书写练习、汉字发音朗读，每天练一点，轻松打基础。',
    imgUrl: 'https://oss-cdn.tsdanci.com/tsdc-web/1751053814688.png',
  })

  window.addEventListener('hashchange', refreshWxShareOnNav)
  window.addEventListener('popstate', refreshWxShareOnNav)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', refreshWxShareOnNav)
  window.removeEventListener('popstate', refreshWxShareOnNav)
})
</script>

<template>
  <div class="page">
    <div class="write-box"><TianZiGeWriter v-model="current" :items="flatHanzi" /></div>
    <div class="picker">
      <TianZiGeGrid v-model="current" :items="flatItems" :columns="5" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  background: #fff;
  min-height: 100vh;
  --cell: 64px;
  --gap: 10px;
  --pinyin: 14px;
  --hanzi: 36px;
  --grid: #d9d9d9;
  --grid-strong: #bfbfbf;
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 14px 0;
}

.write-box {
  padding: 0 5px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.picker {
  padding: 0 5px;
  margin-bottom: 10px;
}
</style>
