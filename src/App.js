import React, { useState, useCallback } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './styles/AppStyle.css';
import Search from './components/Search'
import Main from './components/Main'

const App = () => {
  const [properties, setProperties] = useState(null);

  const callSetProperties = useCallback((prop_properties) => {
    setProperties(prop_properties);
  }, []);
  
  return (
      <div className="App">
        <div class="header">
            <div class="header-title">WorkerOrder</div>
            <Search onSubmit={callSetProperties} />
        </div> 
        <Main properties={properties}/>
      </div>
  );
}

export default App;
