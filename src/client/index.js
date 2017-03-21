import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import { reducer } from './reducer';
import App from './components/App';

const el = document.createElement('div');
el.id = 'react-root';
document.body.appendChild(el);

const store = createStore(reducer);
const Container = connect(s => s)(App);

ReactDOM.render(<Container store={store} />, el);
