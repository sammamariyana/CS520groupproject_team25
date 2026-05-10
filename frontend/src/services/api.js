const BASE = 'http://localhost:3001'

function getToken() {
  return localStorage.getItem('cn_token')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    localStorage.removeItem('cn_token')
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
    return
  }

  if (res.status === 204) return null

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  get:    (path)        => request('GET',    path),
  post:   (path, body)  => request('POST',   path, body),
  patch:  (path, body)  => request('PATCH',  path, body),
  delete: (path)        => request('DELETE', path),

  upload(path, formData) {
    return fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    }).then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data
    })
  },
}
