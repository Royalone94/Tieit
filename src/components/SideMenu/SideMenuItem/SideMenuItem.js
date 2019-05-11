// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15
  }
});

class SideMenuItem extends PureComponent {

  render() {
    const {
      text,
      textColor,
      iconName,
      iconColor,
      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name={iconName} style={[styles.icon, { color: iconColor }]} />
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

SideMenuItem.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  onPress: PropTypes.func,
};

SideMenuItem.defaultProps = {
  text: '',
  textColor: '#000',
  iconName: '',
  iconColor: '#000',
  onPress: null
};

export default SideMenuItem;
