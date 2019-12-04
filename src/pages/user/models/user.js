import { notification } from 'antd';
import * as services from '../services/user';

export default {
  namespace: 'user',

  state: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    userList: [],
  },
  reducers: {
    stateWillBeUpdated(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    * getUserList(_, { select, call, put }) {

      const userList = yield select(state => state.user.userList);
      const pageNum = yield select(state => state.user.pageNum);
      const pageSize = yield select(state => state.user.pageSize);

      if (userList.length <= 0) {
        const result = yield call(services.fetchUserList, pageNum, pageSize);

        const { retCode, retValue, dataRows, rowCount } = result;

        console.log('--------', result);
        if (retCode === '1') {
          yield put({
            type: 'stateWillBeUpdated',
            payload: {
              userList: dataRows,
              total: rowCount,
            },
          });
        } else {
          notification.error({
            message: '获取用户列表失败',
            description: retValue,
          });
        }
      }
    },

    * changePage({ payload }, { put }) {
      const { current } = payload;
      yield put({
        type: 'stateWillBeUpdated',
        payload: {
          pageNum: current,
        },
      });
    },

    * changePageSize({ payload }, { put }) {
      const { pageSize } = payload;
      yield put({
        type: 'stateWillBeUpdated',
        payload: {
          pageSize,
        },
      });
    },
  },
};
