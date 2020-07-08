const USER_TYPE = {
  ADMIN: '0',
  SYSTEM: '1',
  LOAN_ASSISTANCE: '2',
  ENTERPRISE: '3'
}

const USER_TYPE_MAP = new Map([
  [USER_TYPE.ADMIN, { value: USER_TYPE.ADMIN, label: '系统管理员' }],
  [USER_TYPE.SYSTEM, { value: USER_TYPE.SYSTEM, label: '系统用户' }],
  [USER_TYPE.LOAN_ASSISTANCE, { value: USER_TYPE.LOAN_ASSISTANCE, label: '助贷用户' }],
  [USER_TYPE.ENTERPRISE, { value: USER_TYPE.ENTERPRISE, label: '企业用户' }]
])

export default {
  USER_TYPE,
  USER_TYPE_MAP
}
