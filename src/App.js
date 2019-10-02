import React from 'react';
import Product from './component/Product';
import Header from './component/Header';
import ProductList from './component/ProductList';
import { HashRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (

    <div className='app-container'>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Product />
          </Route>
          <Route path="/prodList">
            <ProductList />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
