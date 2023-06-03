import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.min.js');
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
