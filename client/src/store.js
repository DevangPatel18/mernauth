import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
const initialState = { testing: 'foo' }
const middleware = [thunk]

const reducer = (state, action) => {
  return {state}
}

const store = createStore(
  (reducer),
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ()
  )
)
export default store
