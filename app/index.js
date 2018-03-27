import React, { Component } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './reducers/store';

import Application from './components/App';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}

render(
  <App />,
    document.getElementById('root')
);
