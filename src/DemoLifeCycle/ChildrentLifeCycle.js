import React, { Component } from "react";

export default class ChildrentLifeCycle extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Nav 1 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Nav 2
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  // trước khi component này biến mất sẽ chạy hàm này 
  componentWillUnmount() {
    console.log("componentWillUnmount của thằng con");
  }
}
