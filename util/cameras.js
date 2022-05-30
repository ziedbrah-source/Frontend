import axios from 'axios';
import { useContext } from 'react';
const BASE_URL = 'http://192.168.0.3:5500/camera-products';
export async function getAllCamerasForUser(token) {
  const url = BASE_URL + '/user';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(url, config);
  return response.data;
}
export async function createCamera(token) {
  const url = BASE_URL;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(url, config);
  return response.data;
}