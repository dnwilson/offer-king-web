import { useContext, useState } from "react"
import axios from 'axios';
import { AppContext } from "../AppContext"

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

const useApi = () => {
  const { setSession, setOffers } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async (params) => {
    try {
      setIsLoading(true)
      const response = await post('login', params)
      setSession(response.data)
      return response
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (params) => {
    try {
      setIsLoading(true)
      const response = await post('sign-up', params)
      setSession(response.data)
      return response
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOffers = async () => {
    try {
      return await get('offers')
    } catch (error) {
      console.error(error)
      return error?.response
    }
  }

  const claimOffer = (id) => {
    post(`offers/${id}/offers`)
      .then((response) => {
        const offer = response.data;
        setOffers((offers) =>
          offers.map((off) => (off.id === offer.id ? offer : off))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const unclaimOffer = (id) => {
    destroy(`offers/${id}`)
      .then((response) => {
        const newOffer = response.data;
        setOffers((offers) =>
          offers.map((offer) => (offer.id === newOffer.id ? newOffer : offer))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    loginUser,
    signUp,
    fetchOffers,
    unclaimOffer,
    claimOffer,
    isLoading
  }
}

export default useApi