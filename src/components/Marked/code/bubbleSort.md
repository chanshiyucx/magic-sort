## 基础冒泡算法

改进冒泡排序：设置一标志性变量 pos，用于记录每趟排序中最后一次进行交换的位置。由于 pos 位置之后的记录均已交换到位，故在进行下一趟排序时只要扫描到 pos 位置即可。

```javascript
const nums = [20, 72, 31, 83, 9, 44, 14, 58, 51, 66, 38, 99, 40, 25, 88]
const len = nums.length
for (let i = 0; i < len; i++) {
  for (let j = 0; j < len - 1 - i; j++) {
    if (nums[j].num > nums[j + 1].num) {
      ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
    }
  }
}
```
