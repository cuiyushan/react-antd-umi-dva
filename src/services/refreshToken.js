import Cookies from 'js-cookie';
// import {addCredential} from "../utils/credential";

function parseJSON(response) {
  return response.json();
}

export function refreshTokenService() {
  const refreshTokenJSON = { CU_RefreshToken_MIP: Cookies.get('refreshToken') };
  return fetch('/process-gateway/process-authserver/refreshtoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      CU_RefreshToken_MIP: Cookies.get('refreshToken'),
    },
    body: JSON.stringify(refreshTokenJSON),
  }).then(parseJSON).then((json) => {
    // console.log('refresh credential', json);
    return json;
  }).catch((e) => {
    console.log(e);
  })}
