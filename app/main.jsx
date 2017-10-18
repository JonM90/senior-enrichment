'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import Main from './components/Main'

//{
//<Provider store={store}>
// <Main />
// <Root/>
// </Provider>
//}

render (
  <Main />,
  document.getElementById('main')
)
