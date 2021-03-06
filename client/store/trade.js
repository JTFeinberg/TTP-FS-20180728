import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const TRADE_STOCK = 'TRADE_STOCK'
const GET_TRADE = 'GET_TRADE'


/**
 * ACTION CREATORS
 */
const tradeStock = stock => ({type: TRADE_STOCK, payload: stock})
const getTrade = trade => ({type: GET_TRADE, payload: trade})

/**
 * THUNK CREATORS
 */

export const postTradedStockThunk = (formInputs, userId) => async dispatch => {
  let res
  const {
    action,
    stockSymbol,
    numOfShares,
    quote
  } = formInputs
  try {
      res = await axios.post(`/api/user/transaction/${action.toLowerCase()}`, {
        action,
        stockSymbol,
        numOfShares,
        price: quote.latestPrice,
        userId
      })
      dispatch(tradeStock(res.data))
      history.push(`/user/trade_confirmation/${res.data.id}`)
    } catch (err) {
        console.error(err)
    }
}

export const fetchTradedStockThunk = (tradeId) => async dispatch => {
  let res
  try {
    res = await axios.get(`/api/user/transaction/${tradeId}`)
    dispatch(getTrade(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case TRADE_STOCK:
      return action.payload
    case GET_TRADE:
      return action.payload
    default:
      return state
  }
}