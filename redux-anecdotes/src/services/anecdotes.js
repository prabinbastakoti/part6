import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getALL = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (content, id) => {
  const anecdote = { content, votes: 0, id };
  const response = await axios.post(baseURL, anecdote);
  return response.data;
};

const update = async (id, anecdote) => {
  const response = await axios.put(`${baseURL}/${id}`, anecdote);
  return response.data;
};

const anecdoteService = { getALL, create, update };

export default anecdoteService;
