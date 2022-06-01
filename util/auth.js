import axiosInstance from '../axios';
import requests from '../requests';

async function register(email, password, firstname, lastname) {
  const response = await axiosInstance.post(requests.register, {
    email: email,
    password: password,
    firstName: firstname,
    lastName: lastname,
  });
  return response.data;
}

async function logIn(email, password) {
  const response = await axiosInstance.post(requests.login, {
    email: email,
    password: password,
  });
  const token = response.data.access_token;
  //console.log(token);
  return token;
}

export function createUser(email, password, firstname, lastname) {
  return register(email, password, firstname, lastname);
}

export function login(email, password) {
  return logIn(email, password);
}

export async function PostExpoToken(deviceToken, token) {
  const url = 'http://172.20.10.13:5500/auth/profile/expotoken/';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    url,
    {
      token: deviceToken,
    },
    config
  );

  return response.data;
}
