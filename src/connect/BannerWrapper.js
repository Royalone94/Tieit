// @flow

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

export default class BannerWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    this._store = context.store;
  }

  render() {
    return (
      <View style={styles.flex}>
        {Children.only(this.props.children)}
      </View>
    );
  }
}
