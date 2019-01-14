<template>
  <div class="pane">
    <Post :type="type" />
    <div class="box">
      <div class="box-left">
        <div class="info">
          <p>
            当前排序算法： <span class="name">{{ curSortTab }}</span>
          </p>
          <p>输入值：[20, 72, 31, 83, 9, 44, 14, 58, 51, 66, 38, 99, 40, 25, 88]</p>
          <p>输出值：[9, 14, 20, 25, 31, 38, 40, 44, 51, 58, 66, 72, 83, 88, 99]</p>
          <p>千次排序总时长：{{ total }} ms 【数值可能有浮动，仅供参考】</p>
          <div class="btn-group">
            <button @click="toggleAnime">{{ this.timer ? '暂停' : '开始' }}</button>
            <button @click="init">重置</button> <button @click="switchSpeed">{{ speedTxt }}</button>
          </div>
        </div>
        <div class="chart">
          <div
            v-for="item in nums"
            :key="item.key"
            :style="{
              height: `${item.num * 3}px`,
              transform: getStatus(item.key).transform,
              background: getStatus(item.key).color,
              transitionDuration: `${duration}s`
            }"
          >
            <span>{{ item.num }}</span>
          </div>
        </div>
      </div>
      <div class="marked">
        <Tabs v-model="curSortTab">
          <TabPane v-for="item in section" :key="item.title" :name="item.title" :label="item.title">
            <div v-html="getHtml(item.desc)"></div>
            <div class="md-pane" :id="item.title" v-html="getHtml(item.code)"></div>
          </TabPane>
        </Tabs>
        <div class="code-btn-box">
          <a class="dark-btn" @click="scrollTo('top')"> <i class="icon">&#xe800;</i> </a>
          <a class="dark-btn" @click="scrollTo('bottom')"> <i class="icon">&#xe801;</i> </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import Post from '../Post'
import Prism from '../../assets/prism/prism.js'
import { bubbleSort, selectionSort, insertionSort } from './md'
import * as algorithm from './algorithm'

const renderer = new marked.Renderer()
marked.setOptions({
  renderer,
  highlight: (code, lang) => {
    return Prism.highlight(code, Prism.languages[lang || 'markup'], lang)
  }
})

// 所有算法描述
const allSort = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort
}

// 算法对应
const mapping = {
  bubble: [
    { name: '经典冒泡算法', sortType: 'bubbleSort1' },
    { name: '改进冒泡算法', sortType: 'bubbleSort2' },
    { name: '终极冒泡算法', sortType: 'bubbleSort3' }
  ],
  selection: [{ name: '经典选择算法', sortType: 'selectionSort' }],
  insertion: [
    { name: '经典插入算法', sortType: 'insertionSort1' },
    { name: '二分插入算法', sortType: 'insertionSort2' }
  ]
}

// 初始数据
const initNums = [20, 72, 31, 83, 9, 44, 14, 58, 51, 66, 38, 99, 40, 25, 88]
// 生成 key
const initData = initNums.map((num, i) => ({ num, key: `${num}_${i}` }))
// 深拷贝
const deepCopy = data => JSON.parse(JSON.stringify(data))

export default {
  name: 'App',
  components: {
    Post
  },
  props: ['type', 'curTab'],
  data() {
    return {
      html: '',
      section: [],
      curSortTab: '',
      sortType: '',
      total: 0,
      nums: [],
      status: {}, // 用来保存信息
      snapShot: [], // 快照
      timer: '',
      posTimer: '',
      speed: 1,
      time: [1600, 1100, 600],
      colors: [
        'rgba(255, 255, 255, 0.4)',
        'rgba(255, 128, 255, 0.5)',
        'rgba(204, 85, 119, 0.5)',
        'rgba(243, 112, 24, 0.7)'
      ]
    }
  },
  computed: {
    duration() {
      return [0.5, 0.4, 0.3][this.speed]
    },
    speedTxt() {
      return ['一倍速', '二倍速', '三倍速'][this.speed]
    }
  },
  watch: {
    curTab(val) {
      if (val === this.type) {
        this.init()
      }
    },
    curSortTab(val, oldVal) {
      if (val !== oldVal) {
        this.getSortType()
      }
    }
  },
  created() {
    this.getSection()
  },
  methods: {
    // 将内容拆分成块
    getSection() {
      this.section = (allSort[this.type] || bubbleSort)
        .trim()
        .split('## ')
        .filter(o => o.length)
        .map(o => {
          const title = o.match(/.+?\r\n/)[0].trim()
          const rest = o.slice(title.length)
          const desc = rest.split('```')[0]
          const code = rest.slice(desc.length)
          return {
            title,
            desc,
            code
          }
        })
      this.curSortTab = this.section[0].title
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    // 生成右侧 html
    getHtml(content) {
      return marked(content, { renderer })
    },
    // 采用哪种排序算法
    getSortType() {
      if (mapping[this.type]) {
        this.sortType = mapping[this.type].find(o => o.name === this.curSortTab).sortType
        this.init()
        this.getTime()
      }
    },
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
      this.sort()
    },
    // 排序
    sort() {
      if (this[this.sortType]) this[this.sortType]()
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
    // 暂停/开始
    toggleAnime() {
      if (!this.snapShot.length) {
        this.init()
        setTimeout(() => {
          this.anime()
        }, 1000)
        return
      }

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
    // 滚动
    scrollTo(type) {
      const box = document.getElementById(this.curSortTab).getElementsByTagName('pre')[0]
      const pos = type === 'top' ? 0 : box.scrollHeight
      box.scrollTo({
        top: pos,
        behavior: 'smooth'
      })
    },
    // 去重
    removeDup(arr) {
      const temp = []
      const list = []
      arr.forEach(o => {
        const key = o.map(t => `${t.num}-${t.state}`).join('')
        if (!temp.includes(key)) {
          list.push(o)
          temp.push(key)
        }
      })
      return list
    },

    /**
     * ===================================
     *              冒泡排序
     * ===================================
     **/
    // 经典冒泡算法
    bubbleSort1() {
      const nums = this.nums
      const len = nums.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (nums[j].num > nums[j + 1].num) {
            // 交换位置
            ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
          }
          // 制作动画帧
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
          this.snapShot.push(data)
        }
      }
      this.snapShot = this.removeDup(this.snapShot)
    },
    // 改进冒泡算法
    bubbleSort2() {
      const nums = this.nums
      const len = nums.length
      let i = len - 1
      while (i > 0) {
        let pos = 0
        for (let j = 0; j < i; j++) {
          if (nums[j].num > nums[j + 1].num) {
            // 记录交换時的位置
            pos = j
            // 交换位置
            ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
          }
          // 制作动画帧
          const data = deepCopy(nums)
          data[j].state = 1
          data[j + 1].state = 1
          data.forEach((o, k) => {
            if (k > i) {
              o.state = 2
            }
          })
          this.snapShot.push(data)
        }
        i = pos
      }
      // 制作动画帧
      const data = deepCopy(nums)
      data.forEach(o => (o.state = 2))
      this.snapShot.push(data)
      this.snapShot = this.removeDup(this.snapShot)
    },
    // 终极冒泡算法
    bubbleSort3() {
      const nums = this.nums
      let low = 0
      let high = nums.length - 1
      let i
      while (low < high) {
        for (i = low; i < high; ++i) {
          // 正向排序，找出最大值
          if (nums[i].num > nums[i + 1].num) {
            // 交换位置
            ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
          }
          // 制作动画帧
          const data = deepCopy(nums)
          data[i].state = 1
          data[i + 1].state = 1
          data.forEach((o, k) => {
            if (k > high || k < low) {
              o.state = 2
            }
          })
          this.snapShot.push(data)
        }
        --high

        for (i = high; i > low; --i) {
          // 反向排序，找出最小值
          if (nums[i].num < nums[i - 1].num) {
            // 交换位置
            ;[nums[i], nums[i - 1]] = [nums[i - 1], nums[i]]
          }
          // 制作动画帧
          const data = deepCopy(nums)
          data[i].state = 1
          data[i - 1].state = 1
          data.forEach((o, k) => {
            if (k > high || k < low) {
              o.state = 2
            }
          })
          this.snapShot.push(data)
        }
        ++low
      }
      const data = deepCopy(nums)
      data.forEach(o => {
        o.state = 2
      })
      this.snapShot.push(data)
      this.snapShot = this.removeDup(this.snapShot)
    },
    /**
     * ===================================
     *              选择排序
     * ===================================
     **/
    selectionSort() {
      const nums = this.nums
      const len = nums.length
      let min = 0
      let data
      for (let i = 0; i < len - 1; i++) {
        min = i
        // 制作动画帧
        data = deepCopy(nums)
        data[min].state = 3
        data.forEach((o, k) => {
          if (k < i) {
            o.state = 2
          }
        })
        this.snapShot.push(data)
        for (let j = i + 1; j < len; j++) {
          let temp = min
          if (nums[min].num > nums[j].num) {
            min = j
          }
          // 制作动画帧
          if (min === j) {
            data = deepCopy(nums)
            data[j].state = 1
            data[temp].state = 3
            data.forEach((o, k) => {
              if (k < i) {
                o.state = 2
              }
            })
            this.snapShot.push(data)
          }

          data = deepCopy(nums)
          data[j].state = 1
          data[min].state = 3
          data.forEach((o, k) => {
            if (k < i) {
              o.state = 2
            }
          })
          this.snapShot.push(data)
        }
        ;[nums[i], nums[min]] = [nums[min], nums[i]] // 交换位置

        // 制作动画帧
        data = deepCopy(nums)
        data[i].state = 3
        data[min].state = 3
        data.forEach((o, k) => {
          if (k < i) {
            o.state = 2
          }
        })
        this.snapShot.push(data)
      }
      data = deepCopy(nums)
      data.forEach(o => {
        o.state = 2
      })
      this.snapShot.push(data)
      this.snapShot = this.removeDup(this.snapShot)
    },
    /**
     * ===================================
     *              插入排序
     * ===================================
     **/
    // 经典插入排序
    insertionSort1() {
      const nums = this.nums
      const len = nums.length
      let data
      for (let i = 1; i < len; i++) {
        let k = nums[i]
        let j = i - 1

        // 下一个
        data = deepCopy(nums)
        data.forEach((o, k) => {
          if (k < i) {
            o.state = 2
          }
        })
        if (i > 1) data[i].state = 3
        this.snapShot.push(data)

        // 先行比较
        if (nums[j].num <= k.num) {
          data = deepCopy(nums)
          data.forEach((o, k) => {
            if (k < i) {
              o.state = 2
            }
          })
          data[j + 1].state = 3
          if (i === 1) {
            this.snapShot.push(deepCopy(data))
          }
          data[j].state = 1
          this.snapShot.push(deepCopy(data))
        }

        while (j >= 0 && nums[j].num > k.num) {
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]

          j--

          data = deepCopy(nums)
          data.forEach((o, k) => {
            if (k <= i) {
              o.state = 2
            }
          })
          data[j + 1].state = 3
          if (j < len - 2) data[j + 2].state = 1
          this.snapShot.push(data)
        }
        ;[nums[j + 1], k] = [k, nums[j + 1]]

        // 尾比较帧
        if (j >= 0) {
          data = deepCopy(nums)
          data.forEach((o, k) => {
            if (k <= i) {
              o.state = 2
            }
          })
          data[j + 1].state = 3
          data[j].state = 1
          this.snapShot.push(deepCopy(data))
        }

        // 该轮排序完成
        data = deepCopy(nums)
        data.forEach((o, k) => {
          if (k <= i) {
            o.state = 2
          }
        })
        this.snapShot.push(data)
      }

      data = deepCopy(nums)
      data.forEach(o => {
        o.state = 2
      })
      this.snapShot.push(deepCopy(data))
      this.snapShot = this.removeDup(this.snapShot)
    },
    // 二分插入排序
    insertionSort2() {
      const nums = this.nums
      const len = nums.length
      let data
      for (let i = 1; i < len; i++) {
        let k = nums[i]
        let left = 0
        let right = i - 1

        // 下一个
        data = deepCopy(nums)
        data.forEach((o, k) => {
          if (k < i) {
            o.state = 2
          }
        })
        if (i > 1) data[i].state = 3
        this.snapShot.push(data)

        // 先行比较
        if (nums[i - 1].num <= k.num) {
          data = deepCopy(nums)
          data.forEach((o, k) => {
            if (k < i) {
              o.state = 2
            }
          })
          data[i].state = 3
          if (i === 1) {
            this.snapShot.push(deepCopy(data))
          }
          data[i - 1].state = 1
          this.snapShot.push(deepCopy(data))
        }

        while (left <= right) {
          let middle = ~~((left + right) / 2)
          if (k.num < nums[middle].num) {
            right = middle - 1
          } else {
            left = middle + 1
          }
        }
        // 插入标志帧
        data = deepCopy(nums)
        data.forEach((o, k) => {
          if (k <= i) {
            o.state = 2
          }
        })
        data[i].state = 3
        data[left].state = 3
        this.snapShot.push(data)

        for (let j = i - 1; j >= left; j--) {
          ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
          // 逐个比较
          data = deepCopy(nums)
          data.forEach((o, k) => {
            if (k <= i) {
              o.state = 2
            }
          })
          data[j + 1].state = 1
          if (j < len - 2) data[j].state = 3
          data[left].state = 3
          this.snapShot.push(data)
        }
        ;[nums[left], k] = [k, nums[left]]

        // 该轮排序完成
        data = deepCopy(nums)
        data.forEach((o, k) => {
          if (k <= i) {
            o.state = 2
          }
        })
        this.snapShot.push(data)
      }
      data = deepCopy(nums)
      data.forEach(o => {
        o.state = 2
      })
      this.snapShot.push(deepCopy(data))
      this.snapShot = this.removeDup(this.snapShot)
    },
    /**
     * ===================================
     *            获取算法运行时长
     * ===================================
     **/
    getTime() {
      if (!algorithm[this.sortType]) return
      if (this.type !== this.curTab) return
      const startTime = performance.now()
      for (let i = 0; i < 1000; i++) {
        const temp = [...initNums]
        algorithm[this.sortType](temp)
      }
      const endTime = performance.now()
      const total = endTime - startTime
      this.total = String(total).slice(0, 7)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
