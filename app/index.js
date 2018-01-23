import React, { Component } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import MainPage from './components/MainPage/MainPage';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  }
}

render(
  <App />,
    document.getElementById('root')
);
