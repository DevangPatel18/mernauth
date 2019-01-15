import axios from 'axios'
import { GET_ITEMS } from './types'

export const getItems = userId => dispatch => {
  axios
    .get(`/api/items/${userId}`)
    .then(res => dispatch({ type: GET_ITEMS, items: res.data }))
}
