// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { GRAY } from 'AppColors';

const propTypes = {
  size: PropTypes.number,
  selected: PropTypes.bool,
  color: PropTypes.string,
  onStatusChanged: PropTypes.func
};

const defaultProps = {
  size: 12,
  selected: false,
  color: GRAY,
  onStatusChanged: () => {}
};

export default class MaterialCheckBox extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.selected
    };
  }

  onUpdateStatus = () => {
    this.setState({
      selected: !this.state.selected
    }, () => {
      this.props.onStatusChanged(this.state.selected);
    });
  }

  render() {
    const iconStyle = {
      fontSize: this.props.size,
      color: this.props.color
    };

    const iconName = this.state.selected ? 'check-circle' : 'panorama-fish-eye';

    return (
      <Icon name={iconName} style={iconStyle} />
    );
  }
}

MaterialCheckBox.propTypes = propTypes;
MaterialCheckBox.defaultProps = defaultProps;
