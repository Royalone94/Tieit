// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  BLACK,
  GRAY,
  GREEN,
  LIGHT_GRAY,
  AVATAR_COLOR,
  WHITE,
  DARK_GRAY
} from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { generateShortName, formatNumber, generateFullName } from 'AppUtilities';
import { DealIcon } from 'AppComponents';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    padding: 15
  },
  horizontalView: {
    flexDirection: 'row'
  },
  avatarView: {
    width: 25,
    height: 25,
    backgroundColor: AVATAR_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: 10,
  },
  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 10,
  },
  avatarLabel: {
    fontSize: 12,
    color: WHITE,
    alignSelf: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  arrowIcon: {
    fontSize: 20,
    color: GREEN
  },
  titleLabel: {
    fontSize: 18,
    color: BLACK
  },
  descriptionLabel: {
    fontSize: 16,
    color: DARK_GRAY
  },
  detailLabel: {
    fontSize: 12,
    color: GRAY
  },
  valueLabel: {
    fontSize: 12,
    color: DARK_GRAY
  },
  cellRowSpacing: {
    marginTop: 5
  },
  cellColSpacing: {
    marginLeft: 10
  },
  statusView: {
    borderRadius: 4,
    paddingHorizontal: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusLabel: {
    color: WHITE,
    fontSize: 10,
  }
});

class DealsListItem extends PureComponent {

  renderStatus = (status) => {
    let statusLabel = '';
    let statusColor = '#000';
    switch (status) {
      case 1:
        statusColor = '#4CAF50';
        statusLabel = 'Won';
        break;
      case 2:
        statusColor = '#2196F3';
        statusLabel = 'Open';
        break;
      case 3:
        statusColor = '#F44336';
        statusLabel = 'Lost';
        break;
      case 5:
        statusColor = '#F44336';
        statusLabel = 'Closed';
        break;
      default:
        break;
    }

    const statusStyle = {
      backgroundColor: statusColor
    };

    return (
      <View style={[styles.statusView, statusStyle]}>
        <Text style={styles.statusLabel}>{statusLabel}</Text>
      </View>
    );
  }

  render() {
    const { dealData, contactList, dealList, filtered } = this.props;
    // eslint-disable-next-line max-len
    const selectedDeal = filtered ? dealData : dealList.filter((deal) => deal.id === dealData.deal_id).pop();
    // eslint-disable-next-line max-len
    const selectedContact = contactList.filter((contact) => contact.contact_id === selectedDeal.contact_id).pop();

    const fullName = generateFullName(_.get(selectedContact, 'first_name'),
      _.get(selectedContact, 'last_name'));

    const avatarUri = _.get(selectedDeal, 'assignee_profile_pic', '');

    const renderAvatar = _.isEmpty(avatarUri)
      ? (
        <View style={styles.avatarView}>
          <Text style={styles.avatarLabel}>
            {
              generateShortName(selectedDeal.assignee_name.split(' ')[0],
                selectedDeal.assignee_name.split(' ')[1])
            }
          </Text>
        </View>
      )
      : (
        <Image style={styles.avatarImage} source={{ uri: avatarUri }} />
      );

    const date = new Date(selectedDeal.last_updated_time);

    return (
      <View key={selectedDeal.id} style={styles.container}>
        <View>
          <View style={styles.horizontalView}>
            <Text style={styles.titleLabel}>
              {selectedDeal.name}
            </Text>
            {!filtered && this.renderStatus(selectedDeal.deal_status)}
          </View>
          {!_.isEmpty(selectedContact) &&
            <Text style={[styles.descriptionLabel, styles.cellRowSpacing]}>
              {fullName}
              {!_.isEmpty(selectedContact.contact_company.company_name) ? ', ' : ''}
              {selectedContact.contact_company.company_name}
            </Text>
          }
          <View style={styles.horizontalView}>
            <View>
              <View style={[styles.horizontalView, styles.cellRowSpacing]}>
                <Text style={styles.detailLabel}>Deal Value: </Text>
                <Text style={styles.valueLabel}>
                  ${formatNumber(selectedDeal.deal_value)}
                </Text>
              </View>
              <View style={[styles.horizontalView, styles.cellRowSpacing]}>
                <Text style={styles.detailLabel}>Last Updated: </Text>
                <Text style={styles.valueLabel}>
                  {moment(date).fromNow()}
                </Text>
              </View>
            </View>
            <View style={styles.cellColSpacing}>
              <View style={[styles.horizontalView, styles.cellRowSpacing]}>
                {!_.isEmpty(selectedDeal.probability) &&
                <Text style={[styles.detailLabel, styles.cellColSpacing]}>Probability: </Text>}
                {!_.isEmpty(selectedDeal.probability) &&
                <Text style={styles.valueLabel}>
                  {selectedDeal.probability} %
                </Text>}
              </View>
              {!_.isEmpty(selectedDeal.deal_age) &&
              <View style={[styles.horizontalView, styles.cellRowSpacing]}>
                <Text style={[styles.detailLabel, styles.cellColSpacing]}>Deals Age: </Text>
                <Text style={styles.valueLabel}>
                  {selectedDeal.deal_age} {selectedDeal.deal_age === 1 ? 'day' : 'days'}
                </Text>
              </View>}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.horizontalView}>
            <DealIcon active={true} badgeNumber={selectedDeal.crm_admin_notify} />
            {renderAvatar}
          </View>
          {false && <View style={styles.rightSide}>
            <Icon name="chevron-right" style={styles.arrowIcon} />
          </View>}
        </View>
      </View>
    );
  }
}

DealsListItem.propTypes = {
  dealData: PropTypes.object.isRequired,
  contactList: PropTypes.array.isRequired,
  dealList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  filtered: PropTypes.bool.isRequired,
};

export default DealsListItem;
