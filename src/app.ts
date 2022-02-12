import "default-passive-events";
import { Component } from "react";
import "./app.less";
class App extends Component {
  render = () => this.props.children;
}

export default App;
