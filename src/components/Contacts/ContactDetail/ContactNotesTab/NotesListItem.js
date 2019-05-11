// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { BLACK, GRAY, GREEN, AVATAR_COLOR, WHITE } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { generateShortName } from 'AppUtilities';
import { WINDOW_WIDTH } from 'AppConstants';
import moment from 'moment';

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
    fontSize: 16,
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

class NotesListItem extends PureComponent {

  constructor(props) {
    super(props);

    this.renderHeader = ::this.renderHeader;
    this.renderContent = ::this.renderContent;
  }

  renderHeader() {
    const { itemData } = this.props;

    const avatarUri = _.get(itemData, 'pro_pic');
    const renderAvatar = _.isEmpty(avatarUri)
      ? (
        <View style={styles.avatarView}>
          <Text style={styles.avatarLabel}>
            {generateShortName(_.get(itemData, 'first_name'), _.get(itemData, 'last_name'))}
          </Text>
        </View>
        )
      : (
        <Image style={styles.avatarImage} source={{ uri: avatarUri }} />
        );

    const date = new Date(itemData.first_touch * 1000);

    return (
      <View style={styles.headerView}>
        <Text style={styles.timeLabel}>@ {date.getHours()}:{date.getMinutes()} PM</Text>
        {renderAvatar}
      </View>
    );
  }

  renderContent() {
    const { noteData, onClick } = this.props;

    const date = new Date(noteData.created * 1000);
    let label = 'Created: ';
    if (noteData.modified) {
      label = 'Last Modified: ';
    }

    return (
      <View style={styles.detailView}>
        <View style={styles.horizontalView}>
          <View style={styles.descriptionView}>
            <TouchableOpacity onPress={() => onClick('notes', noteData)}>
              <Text
                style={styles.title}
                numberOfLines={2}
              >
                {noteData.description.plain_text}
              </Text>
            </TouchableOpacity>
            <Text style={styles.description}>
              {label}{moment(date).fromNow()}
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
    const { noteData } = this.props;

    return (
      <View key={noteData.id} style={styles.container}>
        {false && this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }
}

NotesListItem.propTypes = {
  noteData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotesListItem;
