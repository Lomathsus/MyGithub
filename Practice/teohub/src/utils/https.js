import axios from "axios";

const hitokoto = axios.create({
  timeout: 10000,
})

export const Hitokoto_Get = (params, config) => {
  return new Promise((resolve,reject) => {
    hitokoto({
      method: 'GET',
      url: 'https://v1.hitokoto.cn/',
      params,
      ...config
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}