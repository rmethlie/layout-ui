import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// store
import store from './store/init.js';
// components
import AppHeader from './components/AppHeader.jsx';
import Roster from './components/Roster.jsx';
import Containers from './components/Containers.jsx';
import Wizard from './components/Wizard.jsx';
class App extends React.Component {
  render() {
    return <div>
      <Provider store={store}>
        <div className="application">
          <AppHeader/>
          <Roster/>
          <Containers/>
          <Wizard />
        </div>
      </Provider>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
