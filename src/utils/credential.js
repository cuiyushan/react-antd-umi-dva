import Cookies from 'js-cookie';

export function addCredential (response){
  const in2hours = 1/12; // new Date(new Date().getTime() + 10 * 60 * 1000);
  const in4hours = 1/6;
  Cookies.set('mip-authority', JSON.stringify(response.authority), {
    expires: in2hours
  });
  // localStorage.setItem('mip-authority', JSON.stringify(response.authority));
  // const in5mins = new Date(new Date().getTime() + 3 * 60 * 1000);
  // Cookies.set('refreshFlag', 'false', {
  //   expires: in5mins
  // });
  Cookies.set('accessToken', response.token.accessToken, {
    expires: in2hours
  });
  Cookies.set('refreshToken', response.token.refreshToken, {
    expires: in4hours
  });
}

export function clearCredential() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  // Cookies.remove('refreshFlag');
  Cookies.remove('mip-authority');
  localStorage.removeItem('mip-authority');
  // localStorage.removeItem('refreshTime');
}
