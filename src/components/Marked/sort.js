// 冒泡排序
export const bubbleSortMd = `
\`\`\`javascript
const nums = [20, 72, 31, 83, 8, 44, 14, 58, 51, 66, 38, 99, 40, 25, 88]
const len = nums.length
for (let i = 0; i < len; i++) {
  for (let j = 0; j < len - 1 - i; j++) {
    if (nums[j].num > nums[j + 1].num) {
      ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
    }
  }
}
\`\`\`
`
