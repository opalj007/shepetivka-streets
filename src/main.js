// import * as bootstrap from 'bootstrap';
import './scss/main.scss';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById("app"));
root.render(<App/>);
