/**
 * @Author: 蝉时雨
 * @Date: 2019-01-11 21:31:58
 * @Last Modified by: chenxin
 * @Last Modified time: 2019-01-13 11:18:03
 * @Description: 获取算法运行时间
 */

/**
 * 经典冒泡算法
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
  return nums
}

/**
 * 经典冒泡算法
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
  return nums
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
  return nums
}

/**
 * 经典选择算法
 */
export const selectionSort = nums => {
  const len = nums.length
  let min = 0
  for (let i = 0; i < len - 1; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      if (nums[min] > nums[j]) {
        min = j
      }
    }
    ;[nums[i], nums[min]] = [nums[min], nums[i]] // 交换位置
  }
  return nums
}

/**
 * 经典选择算法
 */
export const insertionSort1 = nums => {
  const len = nums.length
  let min = 0
  for (let i = 0; i < len - 1; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      if (nums[min] > nums[j]) {
        min = j
      }
    }
    ;[nums[i], nums[min]] = [nums[min], nums[i]] // 交换位置
  }
  return nums
}
