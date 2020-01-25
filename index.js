import axios from 'axios'
import defaultConfig from './config'

const createInstance = () => {
  return axios.create()
}

const createDefaultConfig = (config) => {
  return config
}

axios.defaults = Object.assign(axios.defaults, createDefaultConfig(defaultConfig))

const get = async (url, config) => {
  const instance = createInstance()
  const res = await instance.get(url, config)
  return res
}

export {
  get
}
