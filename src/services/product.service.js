import api from './api';

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const createProduct = async (payload) => {
  const res = await api.post('/products', payload);
  return res.data;
};

export const updateProduct = async (id, payload) => {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
