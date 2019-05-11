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
    paddingRight: 10,
    zIndex: 1,
    overflow: 'visible',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'center'
  },
  menuIcon: {
    fontSize: 28,
    color: WHITE,
    marginLeft: 10
  },
  rightIcon: {
    fontSize: 30,
    color: WHITE,
    marginRight: 5,
    marginLeft: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: WHITE,
    marginLeft: 10
  }
});

class ModalNavBar extends PureComponent {

  render() {
    const {
      title,
      backAction,
      confirmAction
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.topNav}>
          <View style={styles.horizontalView}>
            <TouchableOpacity
              onPress={backAction}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <Icon name="arrow-back" style={styles.menuIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>
          {!!confirmAction &&
          <TouchableOpacity
            onPress={confirmAction}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          >
            <Icon name="done" style={styles.menuIcon} />
          </TouchableOpacity>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ModalNavBar.propTypes = {
  backAction: PropTypes.func,
  confirmAction: PropTypes.func,
  title: PropTypes.string
};

ModalNavBar.defaultProps = {
  title: '',
  backAction: () => {},
  confirmAction: null
};

export default ModalNavBar;
