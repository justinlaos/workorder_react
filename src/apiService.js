import http from "./api";

const getSearchedProperties = (term) => {
  return http.get(`/search?search_term=${term}`);
};

const getOrders = (id) => {
  return http.get(`/properties/${id}/orders`);
};

const getQuotes = (property_id, order_id) => {
    return http.get(`/properties/${property_id}/orders/${order_id}/quotes`);
  };

const createOrder = (id, data) => {
  return http.post(`/properties/${id}/orders`, data);
};

const createQuote = (property_id, order_id, data) => {
    return http.post(`/properties/${property_id}/orders/${order_id}/quotes`, data);
  };

export default {
    getSearchedProperties,
    getOrders,
    getQuotes,
    createOrder,
    createQuote,
};