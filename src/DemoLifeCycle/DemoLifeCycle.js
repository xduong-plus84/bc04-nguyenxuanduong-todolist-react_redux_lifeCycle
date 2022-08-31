import React, { Component } from "react";
import ChildrentLifeCycle from "./ChildrentLifeCycle";

export default class DemoLifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
    console.log("constructor");
  }

  static getDerivedStateFromProps(newProps, currentState) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  render() {
    console.log("render");
    return (
      <div className="container">
        <span>{this.state.number}</span>
        <button
          onClick={() => {
            this.setState({ number: this.state.number + 1 });
          }}
          className="btn btn-success m-5"
        >
          +
        </button>
        {this.state.number <= 2 ? <ChildrentLifeCycle /> : ""}
      </div>
    );
  }

  // chạy một lần duy nhất khi mới khởi tạo
  componentDidMount() {
    console.log("componentDidMount");
  }

  // chạy sau khi có setState
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }
}
