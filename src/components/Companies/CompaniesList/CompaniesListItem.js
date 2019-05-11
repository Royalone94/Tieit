// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { BLACK, GRAY, GREEN, LIGHT_GRAY } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isEmpty, noop } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
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
  },
  third: {
    fontSize: 16,
    color: GRAY,
    marginLeft: 5,
    marginTop: 5
  },
  phoneIcon: {
    fontSize: 16,
    color: GRAY,
    justifyContent: 'center'
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

class CompaniesListItem extends PureComponent {

  render() {
    const { companyData, contactList, onClick } = this.props;

    const selectedContact =
      contactList.filter((contact) => contact.contact_id === companyData.primary_contact).pop();

    let role = '';
    if (!isEmpty(selectedContact)) {
      role = isEmpty(selectedContact.contact_company.title)
        ? ''
        : `${selectedContact.contact_company.title}, `;
      role = isEmpty(selectedContact.contact_company.company_name)
        ? role
        : `${role}${selectedContact.contact_company.company_name}`;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => onClick(companyData)}
      >
        <View style={styles.container}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.name}>
              {companyData.name}
            </Text>
          </View>
          {!isEmpty(role) &&
            <Text style={styles.second}>
              {role}
            </Text>}
          {!isEmpty(companyData.company_phone) &&
            <View style={styles.phoneView}>
              <Icon name="phone" style={styles.phoneIcon} />
              <Text style={styles.third}>
                {companyData.company_phone}
              </Text>
            </View>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

CompaniesListItem.propTypes = {
  companyData: PropTypes.object.isRequired,
  contactList: PropTypes.array,
  onClick: PropTypes.func,
};

CompaniesListItem.defaultProps = {
  contactList: [],
  onClick: noop
};

export default CompaniesListItem;
