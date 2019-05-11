// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { BLACK, GRAY, GREEN, LIGHT_GRAY } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';
import { isEmpty, get } from 'lodash';
import { generateFullName } from 'AppUtilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 18,
    color: BLACK,
    marginLeft: 15
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3
  },
  second: {
    fontSize: 16,
    color: GRAY,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15
  },
  phoneView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5
  },
  third: {
    fontSize: 16,
    color: GRAY,
    marginLeft: 5,
  },
  phoneIcon: {
    fontSize: 16,
    color: GRAY,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dealImage: {
    width: 15,
    height: 15,
    tintColor: GREEN,
    resizeMode: 'contain',
    marginRight: 10
  },
  moreImage: {
    width: 25,
    height: 25,
    tintColor: LIGHT_GRAY,
    resizeMode: 'contain'
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

class ContactListItem extends PureComponent {

  render() {
    const { itemData, onClick } = this.props;
    const swipeoutRightBtns = [];

    if (!isEmpty(get(itemData, 'contact_data.phone_number.number', ''))) {
      swipeoutRightBtns.push({
        text: 'Call',
        backgroundColor: '#ff6c0d',
        onPress: () => {}
      });
    }

    swipeoutRightBtns.push({
      text: 'Email',
      backgroundColor: '#00b4d9',
      onPress: () => {}
    });

    const swipeoutLeftBtns = [
      {
        text: 'Activity',
        backgroundColor: '#7966ac',
        onPress: () => {}
      }
    ];

    const fullName = generateFullName(
      get(itemData, 'first_name', ''),
      get(itemData, 'last_name', '')
    );

    let height = isEmpty(get(itemData, 'contact_data.phone_number.number', '')) ? 20 : 0;

    const companyTitle = get(itemData, 'title', '');
    const companyName = get(itemData, 'contact_company[0].company_name', '');
    const subTitle = generateFullName(companyTitle, companyName, ', ');

    height = isEmpty(subTitle) ? height + 16 : height;
    const nameStyle = height === 0 ? {} : { height };

    return (
      <Swipeout
        backgroundColor={'transparent'}
        right={swipeoutRightBtns}
        left={swipeoutLeftBtns}
      >
        <TouchableWithoutFeedback
          onPress={() => onClick(itemData)}
        >
          <View style={styles.container}>
            <View>
              <TouchableWithoutFeedback onPress={() => onClick(itemData)}>
                <View style={[nameStyle, { justifyContent: 'center' }]}>
                  <Text style={styles.name}>
                    {!isEmpty(fullName)
                      ? fullName
                      : itemData.contact_data.email_address.email
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {!isEmpty(subTitle) &&
              <Text style={styles.second}>
                {subTitle}
              </Text>
              }
              {!isEmpty(itemData.contact_data.phone_number.number) &&
              <View style={styles.phoneView}>
                <Icon name="phone" style={styles.phoneIcon} />
                <Text style={styles.third}>
                  {itemData.contact_data.phone_number.number}
                </Text>
              </View>
              }
            </View>
            <View style={styles.iconView}>
              {!isEmpty(itemData.active_deal) &&
                <Image
                  source={require('img/icons/tab_bar/icon_deals.png')}
                  style={styles.dealImage}
                />
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    );
  }
}

ContactListItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactListItem;
