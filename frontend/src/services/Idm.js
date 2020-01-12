import Socket from "../util/Socket";
import { idmEPs } from "../Config.json";

const { registerEP, loginEP, logoutEP, userEP } = idmEPs;

async function register(email, password, first_name, last_name, type) {
  const payload = {
    username: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    user_type: type
  };

  return await Socket.POST(registerEP, payload);
}

async function login(email, password) {
  const payload = {
    username: email,
    password: password
  };

  return await Socket.POST(loginEP, payload);
}

async function logout() {
  return await Socket.POST(logoutEP, null);
}

async function user(username) {
  return await Socket.Get(username);
}

export default {
  register,
  login,
  logout,
  user
};
