import './global.css'
import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './app'

if (module.hot) {
  module.hot.accept()
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
