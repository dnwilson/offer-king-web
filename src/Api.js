import axios from 'axios';


const baseURL = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api/v1'
  } else {
    return 'https://offer-king.fly.dev/api/v1'
  }
}

const http = axios.create({
  baseURL: baseURL(),
  headers: {
    'Content-type': 'application/json',
    'X-TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
  }
})

http.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'))
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const get = (path) => { return http.get(path) }
const post = (path, data) => { return http.post(path, data) }
const destroy = (path) => { return http.delete(path) }

export { get, post, destroy };