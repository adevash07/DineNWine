import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import Main from './Component/MainComponent';
import './App.css';

const store = configureStore();  

class App extends React.Component {

    
  render() {
    return (
      <Provider store = {store} >
        <BrowserRouter>
        		<div className="App">
         			<Main />
        		</div>
        </BrowserRouter>
     </Provider>
     );
    }
  }

export default App;
