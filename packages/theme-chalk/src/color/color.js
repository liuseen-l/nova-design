module.exports = {
  install(_, __, functions) {
    functions.add('palette', (hex) => {
      let result
      if (hex.value.length === 4) {
        result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex.value)
        // 将分解出的分量转换为十进制数，并将它们扩展为 6 位十六进制字符串
        const r = Number.parseInt(result[1] + result[1], 16)
        const g = Number.parseInt(result[2] + result[2], 16)
        const b = Number.parseInt(result[3] + result[3], 16)
        // return "rgba(" + r + ", " + g + ", " + b + ", e)";
        return `${r},${g},${b}`
      }
      else {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.value)
        // 将分解出的分量转换为十进制数
        const r = Number.parseInt(result[1], 16)
        const g = Number.parseInt(result[2], 16)
        const b = Number.parseInt(result[3], 16)
        return `${r},${g},${b}`
      }
    })
  },
}
