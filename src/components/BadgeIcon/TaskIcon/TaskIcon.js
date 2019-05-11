// @flow

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  RED,
  AVATAR_COLOR,
  WHITE,
  LIGHT_GRAY,
  DARK_GREEN
} from 'AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: RED
  },
  icon: {
    fontSize: 14,
    color: WHITE
  },
  state: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 5,
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: AVATAR_COLOR
  }
});

class TaskIcon extends PureComponent {

  render() {
    const mainColor = this.props.active ? DARK_GREEN : LIGHT_GRAY;
    const badgeColor = this.props.active ? RED : LIGHT_GRAY;

    return (
      <View style={[styles.container, { backgroundColor: mainColor }]}>
        <FontAwesome name="tasks" style={styles.icon} />
        <View style={[styles.state, { backgroundColor: badgeColor }]} />
      </View>
    );
  }
}

TaskIcon.propTypes = {
  active: PropTypes.bool
};

TaskIcon.defaultProps = {
  active: true
};

export default TaskIcon;
