/**
 * @Author: 蝉时雨
 * @Date: 2019-01-11 21:31:58
 * @Last Modified by: chenxin
 * @Last Modified time: 2019-01-11 23:50:22
 * @Description: 获取算法运行时间
 */

/**
 * 基础冒泡算法
 */
export const bubbleSort1 = nums => {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j].num > nums[j + 1].num) {
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
}

/**
 * 基础冒泡算法
 */
export const bubbleSort2 = nums => {
  const len = nums.length
  let i = len - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (nums[j].num > nums[j + 1].num) {
        pos = j
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
    i = pos
  }
}

/**
 * 终极冒泡算法
 */
export const bubbleSort3 = nums => {
  let low = 0
  let high = nums.length - 1
  let i
  while (low < high) {
    // 正向排序，找出最大值
    for (i = low; i < high; ++i) {
      if (nums[i].num > nums[i + 1].num) {
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]] // 交换位置
      }
    }
    --high

    // 反向排序，找出最小值
    for (i = high; i > low; --i) {
      if (nums[i].num < nums[i - 1].num) {
        ;[nums[i], nums[i - 1]] = [nums[i - 1], nums[i]] // 交换位置
      }
    }
    ++low
  }
}