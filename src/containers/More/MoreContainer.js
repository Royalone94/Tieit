// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { TopNavBar } from 'AppComponents';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoreContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.onSideMenuClicked = ::this.onSideMenuClicked;
  }

  onSideMenuClicked() {

  }

  render() {
    return (
      <View style={styles.container}>
        <TopNavBar
          title={'More'}
          sideMenuAction={this.onSideMenuClicked}
        />
      </View>
    );
  }
}

MoreContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default MoreContainer;
