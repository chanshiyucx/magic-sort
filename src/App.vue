<template>
  <div id="app">
    <Tabs v-model="curTab">
      <TabPane v-for="tab in tabs" :key="tab.type" :name="tab.type" :label="tab.label">
        <Pane :type="tab.type" :curTab="curTab" />
      </TabPane>
    </Tabs>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Pane from './components/Pane'
// import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Pane
    // Footer
  },
  data() {
    return {
      tabs: [
        { label: '冒泡排序', type: 'bubble' },
        { label: '选择排序', type: 'name1' },
        { label: '插入排序', type: 'name2' },
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
