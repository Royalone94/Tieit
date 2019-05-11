// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { BLACK, WHITE } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  typeIconView: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6C0D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeIcon: {
    fontSize: 16,
    color: WHITE,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 24,
    color: BLACK,
    alignSelf: 'center',
  },
  typeLabel: {
    fontSize: 16,
    color: BLACK,
    alignSelf: 'center',
    marginLeft: 10
  },
});

class ActivityType extends PureComponent {

  render() {
    const {
      text,
      style,
      iconStyle,
      iconViewStyle,
      textStyle,
      onPress,
      iconName
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={[styles.typeIconView, iconViewStyle]}>
          <Icon name={iconName} style={[styles.typeIcon, iconStyle]} />
        </View>
        <Text style={[styles.typeLabel, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

ActivityType.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  style: View.propTypes.style,
  iconStyle: View.propTypes.style,
  iconViewStyle: View.propTypes.style,
  textStyle: View.propTypes.style
};

ActivityType.defaultProps = {
  text: '',
  onPress: null,
  iconName: '',
  style: {},
  iconStyle: {},
  iconViewStyle: {},
  textStyle: {}
};

export default ActivityType;
