import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

it("renders without crashing", () => {
  const div = document.createElement("div");

  App.prototype.initNotification = jest.fn();
  App.prototype.notificate = jest.fn();

  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
