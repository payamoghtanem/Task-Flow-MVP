const BASE_URL = import.meta.env.VITE_API_URL || '';

function getAuthHeader() {
  const token = localStorage.getItem('taskflow_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}/api${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error?.message || 'Request failed');
    err.code = data.error?.code;
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  post: (path, body) => request('POST', path, body),
  get: (path) => request('GET', path),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
};
