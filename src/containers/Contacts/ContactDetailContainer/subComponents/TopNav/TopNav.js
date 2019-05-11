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
import { WINDOW_WIDTH } from 'AppConstants';
import { dismissKeyboard } from 'AppUtilities';
import { isEmpty } from 'lodash';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topNav: {
    backgroundColor: PRIMARY_COLOR,
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    paddingRight: 5,
    zIndex: 0,
    overflow: 'visible'
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WINDOW_WIDTH,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10,
      }
    }),
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    fontSize: 42,
    color: WHITE
  },
  editIcon: {
    fontSize: 24,
    color: WHITE,
    fontWeight: 'bold',
    marginRight: 5
  },
  addIcon: {
    fontSize: 32,
    color: WHITE,
    fontWeight: 'bold',
    marginRight: 10
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    marginTop: -2
  },
  contactView: {
    marginLeft: 45,
    marginBottom: 10,
    marginTop: -7
  },
  detailLabel: {
    fontSize: 14,
    color: WHITE
  },
  phoneIcon: {
    fontSize: 14,
    color: WHITE,
    justifyContent: 'center'
  },
});

class TopNav extends PureComponent {

  render() {
    const {
      onBack,
      onEdit,
      onAdd,
      userName,
      occupation,
      phoneNumber
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.topNav}>
          <View style={styles.topView}>
            <View style={styles.horizontalView}>
              <TouchableOpacity
                onPress={onBack}
              >
                <Icon name="keyboard-arrow-left" style={styles.leftIcon} />
              </TouchableOpacity>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.horizontalView}>
              {onEdit && <TouchableOpacity
                onPress={onEdit}
                hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <FontAwesome name="pencil" style={styles.editIcon} />
              </TouchableOpacity>}
              {onAdd && <TouchableOpacity
                onPress={onAdd}
                hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <Icon name="add" style={styles.addIcon} />
              </TouchableOpacity>}
            </View>
          </View>
          <View style={styles.contactView}>
            {!isEmpty(occupation) &&
            <Text style={styles.detailLabel}>{occupation}</Text>
            }
            {!isEmpty(phoneNumber) &&
              <View style={styles.horizontalView}>
                <Icon name="phone" style={styles.phoneIcon} />
                <Text style={styles.detailLabel}>{phoneNumber}</Text>
              </View>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TopNav.propTypes = {
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  userName: PropTypes.string,
  occupation: PropTypes.string,
  phoneNumber: PropTypes.string,
};

TopNav.defaultProps = {
  userName: '',
  occupation: '',
  phoneNumber: '',
  onEdit: null,
  onAdd: null
};

export default TopNav;
