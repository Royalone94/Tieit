// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { WHITE, PRIMARY_COLOR, LIGHT_GRAY, BLACK } from 'AppColors';
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
    paddingRight: 5,
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
  },
  searchField: {
    flex: 1,
    fontSize: 14,
    backgroundColor: WHITE,
    color: BLACK,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginLeft: 15,
    borderRadius: 3,
    height: NAVBAR_HEIGHT - 15,
  },
  closeButton: {
    fontSize: 16,
    color: WHITE,
    alignSelf: 'center',
    margin: 10
  }
});

class TopNavBar extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isSearchBarVisible: false,
      searchText: ''
    };
  }

  onSearchTextChanged = (e) => {
    this.setState({ searchText: e }, () => {
      this.props.onSearchTextChanged(e);
    });
  }

  onSearchClose = () => {
    this.setState({
      isSearchBarVisible: false,
      searchText: ''
    }, () => {
      this.props.onSearchTextChanged('');
    });
  }

  render() {
    const {
      title,
      onSearchTextChanged,
      addAction,
      moreAction,
      sideMenuAction
    } = this.props;

    const { isSearchBarVisible, searchText } = this.state;

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View>
        {!isSearchBarVisible &&
          <View style={styles.topNav}>
            <View style={styles.horizontalView}>
              {sideMenuAction &&
              <TouchableOpacity
                onPress={sideMenuAction}
                hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              >
                <Icon name="menu" style={styles.menuIcon} />
              </TouchableOpacity>
              }
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.horizontalView}>
              {onSearchTextChanged &&
              <TouchableOpacity
                onPress={() => this.setState({ isSearchBarVisible: true })}
                hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <Icon name="search" style={styles.rightIcon} />
              </TouchableOpacity>
              }
              {addAction &&
              <TouchableOpacity
                onPress={addAction}
                hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <Icon name="add" style={styles.rightIcon} />
              </TouchableOpacity>
              }
              {moreAction && false &&
              <TouchableOpacity
                onPress={moreAction}
                hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <Icon name="more-vert" style={styles.rightIcon} />
              </TouchableOpacity>
              }
            </View>
          </View>
        }
        {isSearchBarVisible &&
          <View style={styles.topNav}>
            <TextInput
              style={styles.searchField}
              placeholder={'Search...'}
              placeholderTextColor={LIGHT_GRAY}
              value={searchText}
              onChangeText={this.onSearchTextChanged}
              underlineColorAndroid={'transparent'}
              returnKeyType={'next'}
              multiline={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              clearButtonMode={'while-editing'}
            />
            <TouchableOpacity
              onPress={this.onSearchClose}
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TopNavBar.propTypes = {
  addAction: PropTypes.func,
  moreAction: PropTypes.func,
  sideMenuAction: PropTypes.func,
  onSearchTextChanged: PropTypes.func,
  title: PropTypes.string
};

TopNavBar.defaultProps = {
  title: '',
  onSearchTextChanged: null,
  addAction: null,
  moreAction: null,
  sideMenuAction: null
};

export default TopNavBar;
