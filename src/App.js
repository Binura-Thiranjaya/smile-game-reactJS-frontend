import './App.css';
import Game from './page/game';
import Login from './page/login';
import Setting from './page/setting';
import Instructions from './page/instructions';
import { Route, BrowserRouter as Router } from 'react-router-dom'  


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/game" component={Game} />
        <Route exact path="/" component={Game} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/instructions" component={Instructions} />
      </Router>

    </div>
  );
}

export default App;

