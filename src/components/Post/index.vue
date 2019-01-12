<template>
  <div class="post">
    <BubbleSort v-if="type === 'bubble'" /><SelectionSort v-if="type === 'selection'" />
  </div>
</template>
<script>
import BubbleSort from './bubbleSort'
import SelectionSort from './selectionSort'

export default {
  name: 'Post',
  components: {
    BubbleSort,
    SelectionSort
  },
  props: ['type']
}
</script>

<style lang="less" scoped>
/deep/.post {
  margin: 20px auto 50px;
  width: 900px;
  color: #aaa;
  > div {
    text-align: left;
    line-height: 1.8;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    .begin {
      float: left;
      font-size: 3.2em;
      line-height: 1em;
      margin-right: 6px;
    }
    p {
      margin: 16px 0;
    }
    ul {
      margin-left: 40px;
    }
  }
}
</style>
