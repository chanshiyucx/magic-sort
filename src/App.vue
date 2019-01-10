<template>
  <div id="app">
    <div class="box">
      <div class="chart">
        <div
          v-for="item in nums"
          :key="item.key"
          :style="{
            height: `${item.num * 2.8}px`,
            transform: getStatus(item.key).transform,
            background: getStatus(item.key).color,
            transitionDuration: `${duration}s`
          }"
        >
          <span>{{ item.num }}</span>
        </div>
      </div>
      <div class="btn-group">
        <button @click="toggleAnime">{{ this.timer ? '暂停' : '开始' }}</button>
        <button @click="init">重置</button> <button @click="switchSpeed">{{ speedTxt }}</button>
      </div>
    </div>
    <Marked></Marked>
  </div>
</template>
<script>
import Marked from './components/Marked'

// 初始数据
const initNums = [20, 72, 31, 83, 8, 44, 14, 58, 51, 66, 38, 99, 40, 25, 88]
// 生成 key
const initData = initNums.map((num, i) => ({ num, key: `${num}_${i}` }))
// 深拷贝
const deepCopy = data => JSON.parse(JSON.stringify(data))

export default {
  name: 'App',
  components: {
    Marked
  },
  data() {
    return {
      nums: [],
      status: {}, // 用来保存信息
      snapShot: [], // 快照
      timer: '',
      posTimer: '',
      speed: 1,
      time: [3000, 2000, 1000],
      colors: ['rgba(255, 255, 255, 0.4)', 'rgba(255, 128, 255, 0.5)', 'rgba(204, 85, 119, 0.5)']
    }
  },
  computed: {
    duration() {
      return [0.7, 0.5, 0.3][this.speed]
    },
    speedTxt() {
      return ['一倍速', '二倍速', '三倍速'][this.speed]
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      clearTimeout(this.timer)
      clearTimeout(this.posTimer)
      this.timer = ''
      this.posTimer = ''
      this.status = {}
      this.snapShot = []
      this.nums = deepCopy(initData)
      this.generateStatus(this.nums, true)
      this.bubbleSort()
    },
    // 生成位置
    generateStatus(data, init = false) {
      const getColor = () => {
        data.forEach(item => {
          this.status[item.key] = { state: item.state }
        })
        this.status = { ...this.status }
      }
      const getPos = () => {
        data.forEach((item, i) => {
          this.status[item.key].pos = i * 36
        })
        this.status = { ...this.status }
      }

      // 应该在动画结束后生成新的状态，而不是在下一次动画前生成新状态
      // pos 动画和 color 动画不应该同时进行，color 动画比 pos 动画先
      getColor()
      init
        ? getPos()
        : (this.posTimer = setTimeout(getPos, (this.time[this.speed] - this.duration) / 2))
    },
    // 获取位置
    getStatus(key) {
      const status = this.status[key] || { pos: 0, state: 0 }
      const offsetX = status.pos
      return {
        transform: `translateX(${offsetX}px)`,
        color: this.colors[status.state]
      }
    },
    // 排序动画
    anime() {
      if (this.snapShot.length) {
        const data = this.snapShot.shift()
        this.generateStatus(data)
        this.timer = setTimeout(() => {
          this.anime()
        }, this.time[this.speed])
      } else {
        clearTimeout(this.timer)
        this.timer = ''
      }
    },
    // 暂停
    toggleAnime() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = ''
      } else {
        this.anime()
      }
    },
    // 倍速
    switchSpeed() {
      if (this.speed === 2) {
        this.speed = 0
      } else {
        this.speed += 1
      }
    },
    // 冒泡排序
    bubbleSort() {
      console.log('排序前-->', initNums)
      const nums = this.nums
      const len = nums.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (nums[j].num > nums[j + 1].num) {
            // 交换位置
            ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
          }
          // 复制数据并设置为 state
          const data = deepCopy(nums)
          data[j].state = 1
          data[j + 1].state = 1
          data.forEach((o, k) => {
            if (i === len - 2 && j === 0) {
              o.state = 2
            } else if (k > len - 1 - i && i > 0) {
              o.state = 2
            }
          })
          // 保存一次快照，排序动画用
          this.snapShot.push([...data])
        }
      }
      console.log('排序后-->', this.nums)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
