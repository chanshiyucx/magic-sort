## 经典选择算法

经典选择算法：在当前无序区选区最小值放入有序区，同时新增一位有序区和减少一位无须区，完成排序。

```javascript
function selectionSort(nums) {
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
```
