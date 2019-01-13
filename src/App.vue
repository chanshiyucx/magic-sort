<template>
  <div id="app">
    <a
      href="https://github.com/chanshiyucx/magic-sort"
      target="_blank"
      class="github-corner"
      aria-label="View source on Github"
    >
      <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" fill="rgba(0, 0, 0, .6)"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="#aaa"
          style="transform-origin: 130px 106px;"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="#aaa"
          class="octo-body"
        ></path>
      </svg>
    </a>
    <Tabs v-model="curTab">
      <TabPane v-for="tab in tabs" :key="tab.type" :name="tab.type" :label="tab.label">
        <Pane :type="tab.type" :curTab="curTab" />
      </TabPane>
    </Tabs>
    <Footer />
  </div>
</template>
<script>
import Pane from './components/Pane'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Pane,
    Footer
  },
  data() {
    return {
      tabs: [
        { label: '冒泡排序', type: 'bubble' },
        { label: '选择排序', type: 'selection' },
        { label: '插入排序', type: 'insertion' },
        { label: '希尔排序', type: 'name3' },
        { label: '归并排序', type: 'name4' },
        { label: '快速排序', type: 'name5' },
        { label: '计数排序', type: 'name6' },
        { label: '基数排序', type: 'name7' },
        { label: '堆排序', type: 'name8' },
        { label: '桶排序', type: 'name9' }
      ],
      curTab: 'bubble'
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
