import Vue from 'vue'
import axios from 'axios'

export function get(api) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}`).then(res => {
      if (res.data.error) {
        console.log('Wrong!!!')
      }
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}