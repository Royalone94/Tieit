// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import { LIGHT_GRAY } from 'AppColors';

const styles = StyleSheet.create({
  inputField: {
    marginTop: 3
  },
  floatLabel: {
  }
});

class FloatingLabelTextInput extends PureComponent {

  render() {
    const {
      floatText,
      onValueChanged,
      inputStyle,
      value,
      onSubmitEditing,
      placeholder,
      floatLabelStyle
    } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback>
          <View>
            <Text style={[styles.floatLabel, floatLabelStyle]}>
              {floatText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <TextInput
            ref={ref => this._inputField = ref}
            style={[styles.inputField, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={LIGHT_GRAY}
            value={value}
            onChangeText={onValueChanged}
            underlineColorAndroid={'transparent'}
            returnKeyType={'next'}
            multiline={false}
            autoCorrect={false}
            autoCapitalize={floatText === 'Email' || floatText === 'Website'
              ? 'none'
              : 'sentences'}
            clearButtonMode={'while-editing'}
            onSubmitEditing={onSubmitEditing}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

FloatingLabelTextInput.propTypes = {
  floatText: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChanged: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.any,
  floatLabelStyle: PropTypes.any
};

FloatingLabelTextInput.defaultProps = {
  floatText: '',
  value: '',
  placeholder: '',
  onValueChanged: null,
  onSubmitEditing: null,
};

export default FloatingLabelTextInput;
