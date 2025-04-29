import fetchWrapper from "../fetchWrapper";

const addUser = "/api/stocks/add-user";

export const addNewUser = async (payload) => {
  return await fetchWrapper.post(addUser, payload);
};

