import 'fetch-detector';
import 'fetch-ie8';
import Cookies from 'js-cookie';
import { notification } from 'antd/lib/index';
import { refreshTokenService } from '../services/refreshToken';
import { addCredential } from './credential';

require('es6-promise')
  .polyfill();

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response, url, options) {
  if (response && response.status === 401) {
    return new Promise((resolve, reject) => {
      if (Cookies.get('refreshToken') !== -1) {
        refreshTokenService()
          .then((data) => {
            if (typeof data !== 'undefined' && Object.prototype.hasOwnProperty.call(data, 'retCode') && data.retCode === '1') {
              addCredential(data.dataRows);
              resolve(data);
            } else {
              reject();
            }
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject();
      }
    }).then((data) => {
      return fetch(url, Object.assign(options, {
        headers:
          {
            'X-CU-AccessToken-MIP': data.dataRows.token.accessToken,
            'Content-Type': options.attached,
          },
      }))
        .then(checkStatus)
        .catch(err => ({
          err,
        }));
    })
      .catch((e) => {
        console.log(e);
        /* eslint no-underscore-dangle: 0 */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
      });
  }

  if (response && response.status === 400) {
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: '请求错误', // ${response.status}: ${response.url}
      description: errortext,
    });
    return response;
  }

  if (response && response.status >= 500) {
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: '请求错误', // ${response.status}: ${response.url}
      description: errortext,
    });
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function formDataTrans(formData) {
  const data = formData;
  let result = '';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result += `${key}=${data[key]}&`;
    }
  }
  return result;
}

function generateRequest(url, options) {
  return fetch(url, options)
    .then((...args) => {
      return checkStatus(...args, url, options);
    })
    .then(parseJSON)
    .catch(err => ({
      err,
    }));
}

function fileDownloadRequest(url, options) {
  return fetch(url, options)
    .then((...args) => {
      return checkStatus(...args, url, options);
    })
    .catch(err => ({
      err,
    }));
}

function generateGetRequest(method) {
  const header = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return header;
}

function generateRequestHeader(method) {
  const header = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    attached: 'application/json',
  };
  try {
    Object.assign(header.headers, {
      'X-CU-AccessToken-MIP': Cookies.get('accessToken'),
    });
  } catch (e) {
    return header;
  }
  return header;
}

function generateFormRequestHeader(method) {
  const header = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    attached: 'application/x-www-form-urlencoded',
  };
  try {
    Object.assign(header.headers, {
      'X-CU-AccessToken-MIP': Cookies.get('accessToken'),
    });
  } catch (e) {
    return header;
  }
  return header;
}

function generateFormDataRequestHeader(method) {
  const header = {
    method,
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    // attached: 'multipart/form-data',
  };
  try {
    Object.assign(header.headers, {
      'X-CU-AccessToken-MIP': Cookies.get('accessToken'),
    });
  } catch (e) {
    return header;
  }
  return header;
}

// const host = 'http://10.124.210.86'

const Request = {
  post(url, data) {
    return generateRequest(url, {
      ...generateRequestHeader('POST'),
      body: JSON.stringify(data),
    });
  },
  postForSso(url) {
    return generateRequest(url, {
      method: 'POST',
    });
  },
  postFormData(url, data) {
    const body = formDataTrans(data);
    return generateRequest(url, {
      ...generateFormRequestHeader('POST'),
      body,
    });
  },
  postFileData(url, data) {
    const body = data;
    return generateRequest(url, {
      ...generateFormDataRequestHeader('POST'),
      body,
    });
  },
  patch(url, data) {
    const body = JSON.stringify(data);
    return generateRequest(url, {
      ...generateRequestHeader('PATCH'),
      body,
    });
  },
  put(url, data) {
    const body = JSON.stringify(data);
    return generateRequest(url, {
      ...generateRequestHeader('PUT'),
      body,
    });
  },
  get(url) {
    return generateRequest(url, { ...generateRequestHeader('GET') });
  },
  getFile(url) {
    return fileDownloadRequest(url, { ...generateRequestHeader('GET') });
  },
  delete(url) {
    return generateRequest(url, { ...generateRequestHeader('DELETE') });
  },
  deleteWithBody(url, data) {
    const body = JSON.stringify(data);
    return generateRequest(url, {
      ...generateRequestHeader('DELETE'),
      body,
    });
  },
  getForCaptcha(url) {
    return generateRequest(url, { ...generateGetRequest('GET') });
  },
};

export default Request;
