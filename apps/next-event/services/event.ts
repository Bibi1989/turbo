import api from "./api";

export const getUserEvents = async () => {
  try {
    const response = await api.get(`/event/user`);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEvent = async (id: string) => {
  try {
    const response = await api.get(`/event/get/${id}`);
    return response.data?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
