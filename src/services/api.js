import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Adjust to match your Django server

export const api = axios.create({
    baseURL: BASE_URL,
});

// Example API calls
export const getEvaluations = () => api.get('/evaluations/');
export const getEvaluation = (signature) => api.get(`/evaluations/?signature=${signature}`);
// Or if you handle detail at /evaluations/<signature>/, then: api.get(`/evaluations/${signature}/`)

export const updateEvaluation = (data) => api.post('/evaluations/', data);
export const deleteEvaluation = (signature) => api.delete('/evaluations/', { data: { signature } });

export const getTags = () => api.get('/tags/');
export const addTag = (name) => api.post('/tags/', { name });
export const removeTag = (name) => api.delete('/tags/', { data: { name } });
