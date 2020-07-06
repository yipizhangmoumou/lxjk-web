export default {
  methods: {
    // 获取字典方法
    getDic (code, key) {
      this.$axios.post('/api/mgm/dict/listDictByParentCode', {code})
        .then((res) => {
          this[key] = res.data
        })
    }
  }
}
