import axios from 'axios';

async function register(email, password, firstname, lastname) {
  const url = 'http://192.168.0.4:5500/auth/register';

  const response = await axios.post(url, {
    email: email,
    password: password,
    firstName: firstname,
    lastName: lastname,
  });
  return response.data;
}

async function logIn(email, password) {
  const url = 'http://192.168.0.4:5500/auth/login/';
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  const token = response.data.access_token;
  console.log(token);
  return token;
}

export function createUser(email, password, firstname, lastname) {
  return register(email, password, firstname, lastname);
}

export function login(email, password) {
  return logIn(email, password);
}
