// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text
} from 'react-native';

import { LIGHTER_GRAY } from 'AppColors';

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: LIGHTER_GRAY,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
});

class CustomSectionHeader extends PureComponent {

  render() {
    return (
      <Text style={styles.sectionHeader}>{this.props.title}</Text>
    );
  }
}

CustomSectionHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default CustomSectionHeader;
