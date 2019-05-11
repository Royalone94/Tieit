// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import PhoneInput from 'react-native-phone-input';

const propTypes = {
  floatText: PropTypes.string,
  onPressFlag: PropTypes.func,
  pickerStyle: PropTypes.any,
  floatLabelStyle: PropTypes.any
};

const defaultProps = {
  floatText: '',
  onPressFlag: null,
};

export default class CountryCodePicker extends PureComponent {

  render() {
    const {
      floatText,
      onPressFlag,
      floatLabelStyle,
      pickerStyle
    } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback>
          <View>
            <Text style={floatLabelStyle}>{floatText}</Text>
          </View>
        </TouchableWithoutFeedback>
        <PhoneInput
          ref={ref => this._main = ref}
          style={pickerStyle}
          onPressFlag={onPressFlag}
        />
      </View>
    );
  }
}

CountryCodePicker.propTypes = propTypes;
CountryCodePicker.defaultProps = defaultProps;
