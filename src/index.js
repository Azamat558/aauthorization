import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store/slices';


const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<React.StrictMode>
  <BrowserRouter>
    < Provider store={store} >
      <App />
    </Provider >
  </BrowserRouter>
</React.StrictMode>);
