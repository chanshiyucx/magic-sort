<template>
  <div class="post">
    <p>
      <span class="begin">冒泡排序</span>
      是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
      是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
    </p>
  </div>
</template>
<script>
export default {
  name: 'Post',
  data() {
    return {
      html: ''
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  margin: 20px auto 50px;
  width: 900px;
  color: #aaa;
  p {
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
  }
}
</style>
