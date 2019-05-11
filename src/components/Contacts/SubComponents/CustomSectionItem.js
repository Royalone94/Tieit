// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  sectionItem: {
    fontSize: 14
  }
});

class CustomSectionItem extends PureComponent {

  render() {
    return (
      <Text style={styles.sectionItem}>{this.props.title}</Text>
    );
  }
}

CustomSectionItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default CustomSectionItem;
