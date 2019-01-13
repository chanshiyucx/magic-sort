## 经典插入算法

经典选择算法：将数列分为有序区和无序区两部分，在每轮循环中从无序区选择一个最小值并入有序区，新增一位有序区同时减少一位无序区，n - 1 轮排序后全部变为有序区，从而完成排序。

```javascript
function selectionSort(nums) {
  const len = nums.length
  let min = 0
  for (let i = 0; i < len - 1; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      if (nums[min] > nums[j]) {
        min = j // 保存最小值的索引
      }
    }
    ;[nums[i], nums[min]] = [nums[min], nums[i]] // 交换位置
  }
  return nums
}
```
