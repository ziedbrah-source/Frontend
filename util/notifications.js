import axios from 'axios';
const BASE_URL = 'http://192.168.0.3:5500/camera-products/notifications';
export async function getNotificationById(token, id) {
  const url = BASE_URL + '/' + id;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(url, config);
  return response.data;
}
