// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LIGHT_GRAY, BLACK, GRAY } from 'AppColors';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: BLACK
  },
  addedData: {
    fontSize: 14,
    marginTop: 5,
    color: GRAY
  }
});

class GroupListItem extends PureComponent {

  render() {
    const { groupData } = this.props;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{groupData.name}</Text>
        <Text style={styles.addedData}>{groupData.added_date}</Text>
      </View>
    );
  }
}

GroupListItem.propTypes = {
  groupData: PropTypes.object.isRequired,
};

export default GroupListItem;
