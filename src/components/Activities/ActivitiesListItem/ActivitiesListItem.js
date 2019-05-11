// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { BLACK, GRAY, GREEN, AVATAR_COLOR, WHITE } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { generateShortName, formatStringToISODate } from 'AppUtilities';
import { WINDOW_WIDTH } from 'AppConstants';
import { CallIcon, EmailIcon, MeetingIcon, TaskIcon, DealIcon } from 'AppComponents';
import { isEmpty } from 'lodash';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 3,
    padding: 10,
    marginTop: 10
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  timeLabel: {
    fontSize: 10,
    color: GRAY,
    marginRight: 5
  },
  avatarView: {
    width: 25,
    height: 25,
    backgroundColor: AVATAR_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  avatarLabel: {
    fontSize: 12,
    color: WHITE,
    alignSelf: 'center',
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  horizontalView: {
    flexDirection: 'row'
  },
  descriptionView: {
    width: WINDOW_WIDTH - 100,
    marginLeft: 10
  },
  title: {
    fontSize: 14,
    fontWeight: '300',
    color: BLACK,
    marginTop: -2
  },
  description: {
    fontSize: 12,
    color: GRAY,
    marginTop: 2
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  arrowIcon: {
    fontSize: 20,
    color: GREEN
  }
});

class ActivitiesListItem extends PureComponent {

  constructor(props) {
    super(props);

    this.renderHeader = ::this.renderHeader;
    this.renderContent = ::this.renderContent;
  }

  renderHeader() {
    const { itemData, contactList } = this.props;

    const assignedContact =
      contactList.map((contact) => contact.contact_id === itemData.assigned_to).pop;

    const avatarUri = _.get(assignedContact, 'profile_pic');
    const renderAvatar = _.isEmpty(assignedContact)
      ? null
      : _.isEmpty(avatarUri)
      ? (
        <View style={styles.avatarView}>
          <Text style={styles.avatarLabel}>
            {generateShortName(_.get(assignedContact, 'first_name'),
              _.get(assignedContact, 'last_name'))}
          </Text>
        </View>
        )
      : (
        <Image style={styles.avatarImage} source={{ uri: avatarUri }} />
        );

    const date = formatStringToISODate(itemData.scheduled_date);

    return (
      <View style={styles.headerView}>
        <Text style={styles.timeLabel}>@ {date.getHours()}:{date.getMinutes()} PM</Text>
        {renderAvatar}
      </View>
    );
  }

  renderContent() {
    const { itemData } = this.props;

    let typeIcon = null;

    switch (itemData.activity_type_id) {
      case 1:
        typeIcon = <CallIcon active={true} />;
        break;
      case 5:
        typeIcon = <EmailIcon active={true} />;
        break;
      case 7:
        typeIcon = <MeetingIcon active={true} />;
        break;
      case 3:
        typeIcon = <TaskIcon active={true} />;
        break;
      default:
        break;
    }

    return (
      <View style={styles.detailView}>
        <View style={styles.horizontalView}>
          <View>
            {typeIcon}
            <DealIcon active={true} badgeNumber={itemData.notification} />
          </View>
          <View style={styles.descriptionView}>
            {!isEmpty(itemData.activity_title) &&
              <Text style={styles.title}>
                {itemData.activity_title}
              </Text>
            }
            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {itemData.plain_text}
            </Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Icon name="chevron-right" style={styles.arrowIcon} />
        </View>
      </View>
    );
  }

  render() {
    const { itemData } = this.props;

    return (
      <View key={itemData.contact_id} style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}

ActivitiesListItem.propTypes = {
  contactList: PropTypes.array.isRequired,
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActivitiesListItem;
