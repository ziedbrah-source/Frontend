import axiosInstance from '../axios';
import requests from '../requests';
export async function getAllCamerasForUser(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axiosInstance.get(
      requests.fetchAllCamerasForUser,
      config
    );
    return response.data;
  } catch (err) {
    throw new Error('Please Log in');
  }
}
export async function createCamera(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axiosInstance.post(
    requests.createCameraForUser,
    config
  );
  return response.data;
}

export async function getCameraById(token, id) {
  const url = requests.getCameraById + '/' + id;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axiosInstance.get(url, config);
  return response.data;
}
