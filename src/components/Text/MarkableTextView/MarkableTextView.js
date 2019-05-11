// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mark: {
    color: '#37BD92',
    fontSize: 20,
    marginRight: 10,
    marginLeft: -15
  },
  unmark: {
    width: 30,
    marginLeft: -15
  },
  text: {
    fontSize: 16
  }
});

class MarkableTextView extends PureComponent {

  render() {
    const {
      text,
      marked,
      style,
      touchable,
      onPress
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        disabled={!touchable}
        onPress={onPress}
      >
        <View style={styles.container}>
          {marked && <Icon name="check" style={styles.mark} />}
          {!marked && <View style={styles.unmark} />}
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MarkableTextView.propTypes = {
  text: PropTypes.string,
  marked: PropTypes.bool,
  onPress: PropTypes.func,
  style: View.propTypes.style,
  touchable: PropTypes.bool
};

MarkableTextView.defaultProps = {
  text: '',
  marked: false,
  onPress: () => {},
  style: {},
  touchable: false
};

export default MarkableTextView;
