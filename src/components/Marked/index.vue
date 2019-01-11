<template>
  <div id="marked"><div v-html="html"></div></div>
</template>
<script>
import marked from 'marked'
import Prism from '../../assets/prism/prism.js'
import { bubbleSort } from './code'

const renderer = new marked.Renderer()
marked.setOptions({
  renderer,
  highlight: (code, lang) => {
    return Prism.highlight(code, Prism.languages[lang || 'markup'], lang)
  }
})

export default {
  name: 'Marked',
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    this.html = marked(bubbleSort, { renderer })
    this.$nextTick(() => {
      Prism.highlightAll()
    })
  }
}
</script>

<style lang="less" scoped>
#marked {
  width: 680px;
  height: 380px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid #262626;
  border-radius: 3px;
  > div {
    height: 100%;
    /deep/p {
      padding: 12px 16px;
      line-height: 1.6;
      color: #aaa;
      text-align: left;
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
