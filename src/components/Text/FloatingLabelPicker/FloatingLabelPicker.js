// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import { LIGHT_GRAY, GRAY } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { noop } from 'lodash';

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    marginBottom: 18,
  },
  floatLabel: {
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    fontSize: 16,
    color: GRAY,
    justifyContent: 'center',
    marginRight: 5
  },
});

class FloatingLabelPicker extends PureComponent {

  renderTouchableLabel = () => {
    const {
      floatText,
      labelStyle,
      value,
      floatLabelStyle,
      touchableCallback
    } = this.props;

    return (
      <View style={styles.inputField}>
        <TouchableWithoutFeedback onPress={touchableCallback}>
          <View>
            <Text style={[styles.floatLabel, floatLabelStyle]}>
              {floatText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={touchableCallback}>
          <View style={styles.horizontalView}>
            <Text style={labelStyle}>
              {value}
            </Text>
            <Icon name="keyboard-arrow-down" style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderNonTouchableLabel = () => {
    const {
      floatText,
      labelStyle,
      value,
      floatLabelStyle
    } = this.props;

    return (
      <View style={styles.inputField}>
        <TouchableWithoutFeedback>
          <View>
            <Text style={[styles.floatLabel, floatLabelStyle]}>
              {floatText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.horizontalView}>
          <Text style={labelStyle}>
            {value}
          </Text>
          <Icon name="keyboard-arrow-down" style={styles.icon} />
        </View>
      </View>
    );
  }

  render() {
    const {
      touchableCallback
    } = this.props;

    if (touchableCallback) {
      return this.renderTouchableLabel();
    }

    return this.renderNonTouchableLabel();
  }
}

FloatingLabelPicker.propTypes = {
  floatText: PropTypes.string,
  value: PropTypes.string,
  labelStyle: PropTypes.any,
  touchableCallback: PropTypes.func,
  floatLabelStyle: PropTypes.any
};

FloatingLabelPicker.defaultProps = {
  floatText: '',
  value: '',
  touchableCallback: null,
};

export default FloatingLabelPicker;
