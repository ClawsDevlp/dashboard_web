import { app } from 'hyperapp'
import { withLogger } from '@hyperapp/logger'

import state from './state/index'
import view from './views/MainView.js'
import actions from './actions'

import './css/styles.css'

withLogger(app)( // start hyperapp
    state,
    actions,
    view,
    document.body
)
console.log('hyperApp started')