import { Reducer, Effect, history } from 'umi';
import { message } from 'antd';
import { accountLogin } from '@/services/login';

export interface StateType {
  status?: string;
  code?: string;
  type?: string;
  currentAuthority?: 'admin' | 'student' | 'teacher';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}
const Model: LoginModelType = {
  namespace: 'login',
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }:any, { call, put }:any) {
      const response = yield call(accountLogin, payload);
      console.log(payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log(response);
      if(response.code === 'OK') {
        message.success('🎉 🎉 🎉  登录成功！');
        history.replace('/welcome');
      }
    }
  },
  reducers: {
    changeLoginStatus(state: any, { payload }: any) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
}
export default Model;
