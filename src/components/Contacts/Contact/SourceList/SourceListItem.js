// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LIGHT_GRAY, BLACK, GRAY } from 'AppColors';
import { formatNumber } from 'AppUtilities';
import { isEmpty } from 'lodash';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    height: 60,
    justifyContent: 'center'
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

class SourceListItem extends PureComponent {

  render() {
    const { sourceData } = this.props;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{sourceData.name}</Text>
        {!isEmpty(sourceData.lead_cost) && <Text style={styles.addedData}>
          ${formatNumber(sourceData.lead_cost)} / {sourceData.leads_cost_units.toLowerCase()}
        </Text>}
      </View>
    );
  }
}

SourceListItem.propTypes = {
  sourceData: PropTypes.object.isRequired,
};

export default SourceListItem;
