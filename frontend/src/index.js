import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from './components/context/ThemeProvider';
import NotificationProvider from './components/context/NotificationProvider';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<NotificationProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</NotificationProvider>
	</BrowserRouter>,
);
