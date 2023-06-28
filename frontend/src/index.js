import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ContextProviders from './components/context/ContextProviders';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ContextProviders>
			<App />
		</ContextProviders>
	</BrowserRouter>,
);
