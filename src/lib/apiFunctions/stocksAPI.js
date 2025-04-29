import fetchWrapper from "../fetchWrapper";

const stocksUrl = "/api/stocks/get-stocks";
const stocksAlertUrl = "/api/stocks/update-stock-alert";
const priceAlert = "/api/stocks/update-stock-alert"
const getPriceAlert = "/api/stocks/user-stock-alert"

export const getStocks = async () => {
  return await fetchWrapper.get(stocksUrl);
};

export const sendEmailAlert = async (payload) => {
  return await fetchWrapper.post(stocksAlertUrl, payload);
};

export const updatePriceAlert = async (payload) => {
  return await fetchWrapper.post(priceAlert, payload)
}

export const getPriceAlertData = async (params) => {
  return await fetchWrapper.get(getPriceAlert,params)
}
