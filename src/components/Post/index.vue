<template>
  <div class="post">
    <div>
      <p>
        <span class="begin">冒泡排序</span>
        是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
      </p>
      <span>冒泡排序算法的运作如下：</span>
      <ul>
        <li>比较相邻的元素。如果第一个比第二个大，就交换他们两个。</li>
        <li>
          对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
        </li>
        <li>针对所有的元素重复以上的步骤，除了最后一个。</li>
        <li>持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。</li>
      </ul>
      <p>
        冒泡排序平均时间复杂度 O(n^2)，在最好情况下，即一次排完時复杂度为 O(n)，在最坏情况下复杂度为
        O(n^2)。
      </p>
    </div>
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
      margin: 0 40px;
    }
  }
}
</style>
