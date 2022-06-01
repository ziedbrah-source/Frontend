import axiosInstance from '../axios';
import requests from '../requests';
export async function getNotificationById(token, id) {
  const url = requests.getNotifications + '/' + id;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axiosInstance.get(url, config);
  return response.data;
}
