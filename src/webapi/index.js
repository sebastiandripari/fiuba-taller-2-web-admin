import axios from 'axios'

const APP_SERVER = process.env.REACT_APP_APP_SERVER
const MEDIA_SERVER = process.env.REACT_APP_MEDIA_SERVER
const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER

export function mediaBaseUrl () {
  if (process.env.NODE_ENV === 'production') return MEDIA_SERVER
  return ''
}

export function appBaseUrl () {
  if (process.env.NODE_ENV === 'production') return APP_SERVER
  return 'https://fiuba-taller-2-auth-server-st.herokuapp.com'
}

export function authBaseUrl () {
  if (process.env.NODE_ENV === 'production') return AUTH_SERVER
  return 'https://fiuba-taller-2-app-server-st.herokuapp.com'
}

export function getVideos () {
  return axios.get(mediaBaseUrl() + '/list')
}

export function getMediaStatus () {
  return axios.get(mediaBaseUrl() + '/status')
}

export function getAuthStatus () {
  return axios.get(authBaseUrl() + '/status')
}

export function getAppStatus () {
  return axios.get(appBaseUrl() + '/status')
}
