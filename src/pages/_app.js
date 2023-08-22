import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    require('bootstrap');
  }, []);

  return (<>
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  </>)
}
