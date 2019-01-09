<template>
  <div id="app">
    <div class="chart">
      <div
        v-for="item in nums"
        :key="item.key"
        :style="{
          height: `${item.num}px`,
          width: '10px',
          transform: getStatus(item.key).transform,
          background: getStatus(item.key).active ? '#fb618d' : '#fcc'
        }"
      ></div>
    </div>
  </div>
</template>
<script>
// 初始数据
const initNums = [20, 72, 31, 83, 9, 44, 14, 58, 51, 66, 38, 99, 40]
// 生成 key
const initData = initNums.map((num, i) => ({ num, key: `${num}_${i}` }))

export default {
  name: 'app',
  data() {
    return {
      nums: [...initData],
      status: {}, // 用来保存信息
      snapShot: [] // 快照
    }
  },
  mounted() {
    this.generateStatus(this.nums)
    this.bubbleSort()
  },
  methods: {
    // 冒泡排序
    bubbleSort() {
      console.log('排序前-->', initNums)
      const nums = this.nums
      const len = nums.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (nums[j].num > nums[j + 1].num) {
            // 交换位置
          }
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
          // 复制数据并设置为 active
          const data = JSON.parse(JSON.stringify(nums))
          data[j].active = true
          data[j + 1].active = true
          // 保存一次快照，排序动画用
          this.snapShot.push([...data])
        }
      }
      console.log('排序后-->', this.nums)
      this.anime()
    },
    // 排序动画
    anime() {
      if (this.snapShot.length) {
        const data = this.snapShot.shift()
        setTimeout(() => {
          this.generateStatus(data)
          this.anime()
        }, 1000)
      }
    },
    // 生成位置
    generateStatus(data) {
      data.forEach((item, i) => {
        this.status[item.key] = {
          pos: i * 15,
          active: item.active
        }
      })
      this.status = { ...this.status }
    },
    // 获取位置
    getStatus(key) {
      const status = this.status[key] || { pos: 0, active: false }
      const offsetX = status.pos
      return {
        transform: `translateX(${offsetX}px)`,
        active: status.active
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
