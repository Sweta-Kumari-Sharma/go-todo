import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Switch>
          <Route path="/" exact component={TodoList} />
          <Route path="/add" component={TodoForm} />
          <Route path="/edit/:id" component={TodoForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
