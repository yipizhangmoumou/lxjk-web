const USER_TYPE = {
  ADMIN: 0,
  SYSTEM: 1,
  LOAN_ASSISTANCE: 2,
  ENTERPRISE: 3
}

const USER_TYPE_MAP = new Map([
  [USER_TYPE.ADMIN, { value: USER_TYPE.ADMIN, label: '系统管理员' }],
  [USER_TYPE.SYSTEM, { value: USER_TYPE.SYSTEM, label: '系统用户' }],
  [USER_TYPE.LOAN_ASSISTANCE, { value: USER_TYPE.LOAN_ASSISTANCE, label: '助贷用户' }],
  [USER_TYPE.ENTERPRISE, { value: USER_TYPE.ENTERPRISE, label: '企业用户' }]
])

const USER_STATUS = {
  INACTIVE: -1,
  ACTIVE: 0,
  BLACKLIST: 1,
  CANCELLATION: 2,
  APPLYING: 3
}

const USER_STATUS_MAP = new Map([
  [USER_STATUS.INACTIVE, { value: USER_STATUS.INACTIVE, label: '停用' }],
  [USER_STATUS.ACTIVE, { value: USER_STATUS.ACTIVE, label: '启用' }],
  [USER_STATUS.BLACKLIST, { value: USER_STATUS.BLACKLIST, label: '黑名单' }],
  [USER_STATUS.CANCELLATION, { value: USER_STATUS.CANCELLATION, label: '注销' }],
  [USER_STATUS.APPLYING, { value: USER_STATUS.APPLYING, label: '申请中' }]
])

export default {
  USER_TYPE,
  USER_TYPE_MAP,
  USER_STATUS,
  USER_STATUS_MAP
}
