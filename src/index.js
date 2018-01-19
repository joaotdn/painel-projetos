import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';
import { ReactTableDefaults } from 'react-table';

Object.assign(ReactTableDefaults, {
    defaultPageSize: 10,
    className: "-striped -highlight",
    previousText: "Anterior",
    nextText: "Próximo",
    loadingText: "Aguarde...",
    noDataText: "Dados não encontrados",
    pageText: "Páginas",
    ofText: "de",
    rowsText: "linhas",
    minRows: 10
});

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    }
});

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
