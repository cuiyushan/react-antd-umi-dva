import Request from '@/utils/fetch';

// 获取用户列表
export function fetchUserList(pageNum, pageSize) {
  return Request.get(`/gateway/users1?pageNum=${pageNum}&pageSize=${pageSize}`);
}

// 添加用户
export function addUser(user) {
  return Request.post('/gateway/users', user);
}
