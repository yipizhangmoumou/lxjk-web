export function validatePhone (rules, value, cb) {
  const REG = /^1[3|4|5|7|8][0-9]{9}$/
  if (!value || !REG.test(value)) return cb(new Error('请输入正确的手机号码'))
  cb()
}

export function validateBase (rules, value, cb) {
  const REG = /[@#/$%^&*,，。、~！!]+/g
  if (REG.test(value)) return cb(new Error('请勿输入非法字符'))
  cb()
}
