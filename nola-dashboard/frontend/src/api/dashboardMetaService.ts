import api from "./api";

export const getChannels = async () => {
  const res = await api.get("/meta/channels");
  return res.data;
};

export const getStores = async () => {
  const res = await api.get("/meta/stores");
  return res.data;
};
