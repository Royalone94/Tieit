// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { PRIMARY_COLOR, WHITE } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { connectUser } from 'AppRedux';
import { SideMenuItem } from 'AppComponents';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR
  },
  header: {
    height: WINDOW_WIDTH * 0.5,
    backgroundColor: PRIMARY_COLOR
  },
  banner: {
    height: WINDOW_WIDTH * 0.5
  },
  headerContentView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  avatar: {
    width: WINDOW_WIDTH * 0.15,
    height: WINDOW_WIDTH * 0.15,
    borderRadius: WINDOW_WIDTH * 0.075,
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: WHITE,
  },
  userInfo: {
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  name: {
    fontSize: 16,
    color: WHITE,
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  email: {
    fontSize: 14,
    color: WHITE,
    fontWeight: '300',
    marginTop: 5,
    backgroundColor: 'transparent'
  },
  menu: {
    padding: 15
  },
  menuItem: {
    fontSize: 16,
    fontWeight: '400',
    color: PRIMARY_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: WINDOW_WIDTH * 0.7,
    paddingHorizontal: 15
  },
  icon: {
    fontSize: 28,
    color: WHITE
  },
  version: {
    alignSelf: 'center',
    fontSize: 14,
    color: WHITE,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
});

class SideMenuContainer extends PureComponent {

  close = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'close'
    });
  }

  logout = () => {}

  goActivity = () => {
    this.props.switchTab(3);
    this.close();
  }

  renderHeader = () => {
    const { user } = this.props;

    return (
      <View style={styles.header}>
        <Image
          style={styles.banner}
          source={require('img/images/side_banner.png')}
        />
        <View style={styles.headerContentView}>
          <Image
            style={styles.avatar}
            resizeMode={'contain'}
            source={{ uri: user.avatar_file }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.email}>
              {user.email}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderMenu = () => {
    return (
      <View style={styles.menu}>
        <SideMenuItem
          text={'Activities'}
          textColor={WHITE}
          iconName={'trending-up'}
          iconColor={WHITE}
          onPress={this.goActivity}
        />
        <SideMenuItem
          text={'CRM'}
          textColor={WHITE}
          iconName={'dashboard'}
          iconColor={WHITE}
          onPress={this.close}
        />
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={this.logout}>
          <Icon name={'input'} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.version}>v1.0</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderMenu()}
        {this.renderFooter()}
      </View>
    );
  }
}

SideMenuContainer.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired
};

export default connectUser()(SideMenuContainer);
