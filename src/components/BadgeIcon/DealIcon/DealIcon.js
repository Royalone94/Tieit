// @flow

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

import {
  WHITE,
  DARK_GRAY,
  GREEN
} from 'AppColors';

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    paddingTop: 8,
  },
  icon: {
    height: 16,
    tintColor: GREEN,
    resizeMode: 'contain',
    marginLeft: -2,
  },
  state: {
    width: 15,
    height: 16,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 2,
    position: 'absolute',
    right: -2,
    top: 2,
    backgroundColor: DARK_GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    fontSize: 8,
    color: WHITE
  }
});

class DealIcon extends PureComponent {

  render() {
    const { badgeNumber } = this.props;
    return (
      <View style={styles.container}>
        {badgeNumber !== 0 &&
          <Image
            source={require('img/icons/tab_bar/icon_deals_selected.png')}
            style={styles.icon}
          />
        }
        {badgeNumber !== 0 &&
          <View style={styles.state}>
            <Text style={styles.badge}>{badgeNumber}</Text>
          </View>
        }
      </View>
    );
  }
}

DealIcon.propTypes = {
  badgeNumber: PropTypes.number
};

DealIcon.defaultProps = {
  badgeNumber: 0
};

export default DealIcon;
