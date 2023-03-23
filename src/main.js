// import * as bootstrap from 'bootstrap';
import '../scss/main.scss';
import { createRoot } from 'react-dom/client';
import StreetTable from './App.js';

const root = createRoot(document.getElementById("app"));
root.render(<StreetTable/>);
