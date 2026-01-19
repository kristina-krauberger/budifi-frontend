import api from "./axiosConfig";


export const getAllCourses = async () => {
  const res = await api.get(`/api/courses`);
  return res.data;
};