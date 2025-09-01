import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import App1 from './App1.tsx'
// import App2 from './App2.tsx'
import {Provider} from 'react-redux'
import store from './store/store.ts'
// import {BrowserRouter} from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  
  <StrictMode>

    

      <Provider store={store}>
       
          <App1 />
       

      </Provider>
    
  </StrictMode>,
)
