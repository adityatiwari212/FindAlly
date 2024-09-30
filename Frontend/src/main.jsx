import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './style.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from "react-redux"
import counterStore from '../redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={counterStore}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
)
