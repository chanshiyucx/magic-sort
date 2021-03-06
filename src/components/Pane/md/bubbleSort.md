## 经典冒泡算法

经典冒泡算法：通过双层循环实现排序，外层循环表示当前是第几轮排序，内层循环表示当前轮的第几次排序，通过两两比较交换位置完成排序。

```javascript
function bubbleSort(nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]] // 交换位置
      }
    }
  }
  return nums
}
```

## 改进冒泡算法

改进冒泡算法：设置一标志性变量 pos，用于记录每轮排序中最后一次进行交换的位置。由于 pos 位置之后的记录均已交换到位，故在进行下一轮排序时只要扫描到 pos 位置即可。

```javascript
function bubbleSort(nums) {
  const len = nums.length
  let i = len - 1
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        pos = j // 记录交换時的位置
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]] // 交换位置
      }
    }
    i = pos
  }
  return nums
}
```

## 终极冒泡算法

终极冒泡算法：传统冒泡排序中每一轮排序操作只能找到一个最大值或最小值，可以在每趟排序中进行正向和反向两遍冒泡方法一次得到两个最终值（最大者和最小者），从而使排序轮数几乎减少了一半。

```javascript
function bubbleSort(nums) {
  let low = 0
  let high = nums.length - 1
  let i
  while (low < high) {
    // 正向排序，找出最大值
    for (i = low; i < high; ++i) {
      if (nums[i] > nums[i + 1]) {
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]] // 交换位置
      }
    }
    --high // 前移一位

    // 反向排序，找出最小值
    for (i = high; i > low; --i) {
      if (nums[i] < nums[i - 1]) {
        ;[nums[i], nums[i - 1]] = [nums[i - 1], nums[i]] // 交换位置
      }
    }
    ++low // 后移一位
  }
  return nums
}
```
