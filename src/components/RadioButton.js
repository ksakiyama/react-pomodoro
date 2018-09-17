import React from "react";
import PropTypes from "prop-types";

export default class RadioButton extends React.Component {
  handleChange = () => {
    this.props.changeHandler(this.props.name);
  };

  render() {
    return (
      <label>
        <input
          type="radio"
          value={this.props.name}
          checked={this.props.name === this.props.selectedOption}
          onChange={this.handleChange}
        />
        {this.props.name}
      </label>
    );
  }
}

RadioButton.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selectedOption: PropTypes.string.isRequired,
};
