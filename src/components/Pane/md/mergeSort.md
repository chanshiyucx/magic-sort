## 经典归并算法

经典归并算法：将数列分为两个子序列，如果子序列长度不为一，再将子序列细分，直至子序列长度为一。递归比较两个子序列并排序后，再相互组合成有序数列，最终完成排序。

```javascript
function mergeSort(nums) {
  const len = nums.length
  if (len <= 1) return nums
  let middle = ~~(len / 2)
  let left = nums.slice(0, middle)
  let right = nums.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left, right)
}
```
