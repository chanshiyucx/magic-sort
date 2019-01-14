## 经典插入算法

经典选择算法：将数列分为有序区和无序区两部分，在每轮循环中从无序区选择一个最小值并入有序区，新增一位有序区同时减少一位无序区，n - 1 轮排序后全部变为有序区，从而完成排序。

```javascript
function insertionSort(nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    let k = nums[i]
    let j = i - 1
    while (j >= 0 && nums[j].num > k.num) {
      nums[j + 1] = num[j]
      j--
    }
    nums[j + 1] = k
  }
  return nums
}
```

## 二分插入算法

二分插入算法：查找插入位置时使用二分查找的方式，在插入值之前，先在有序区中找到待插入值需要比较的左边界，在数据长度较大时，可以有效减少每轮排序中的查找插入位置的次数。

```javascript
function insertionSort(nums) {
  const len = nums.length
  for (let i = 1; i < len; i++) {
    let k = nums[i]
    let left = 0
    let right = i - 1
    while (left <= right) {
      let middle = ~~((left + right) / 2)
      if (k < nums[middle]) {
        right = middle - 1
      } else {
        left = middle + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      nums[j + 1] = nums[j]
    }
    nums[left] = k
  }
  return nums
}
```
