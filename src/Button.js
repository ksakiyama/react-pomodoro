import React from "react";
import PropTypes from "prop-types";

export default class Button extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    return (
      <button onClick={this.handleClick}
        >{this.props.name}</button>
    )
  }
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
