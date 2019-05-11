// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import { WHITE, PRIMARY_COLOR } from 'AppColors';
import { WINDOW_WIDTH, STATUSBAR_HEIGHT, NAVBAR_HEIGHT } from 'AppConstants';
import { dismissKeyboard } from 'AppUtilities';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    zIndex: 1,
    overflow: 'visible',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        paddingTop: STATUSBAR_HEIGHT,
        height: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
      },
      android: {
        height: NAVBAR_HEIGHT,
      }
    }),
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 28,
    color: WHITE,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: WHITE,
  },
  side: {
    width: 50,
    height: 50
  }
});

class TopNavBar extends PureComponent {

  render() {
    const {
      title,
      confirmAction,
      backAction,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.topNav}>
          <View style={styles.horizontalView}>
            <TouchableOpacity
              onPress={backAction}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <Icon name="close" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalView}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.horizontalView}>
            <TouchableOpacity
              onPress={confirmAction}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <Icon name="done" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TopNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  backAction: PropTypes.func.isRequired,
};

export default TopNavBar;
