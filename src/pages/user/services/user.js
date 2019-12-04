import Request from '@/utils/fetch';

// 初始化左侧业务目录树
export function fetchUserList(pageNum, pageSize) {
  return Request.get(`/gateway/users1?pageNum=${pageNum}&pageSize=${pageSize}`);
}
