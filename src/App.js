// App.js
import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
