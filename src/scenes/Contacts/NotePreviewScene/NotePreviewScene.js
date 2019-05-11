// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { BLACK, WHITE, PRIMARY_COLOR } from 'AppColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 50
  },
  inputField: {
    margin: 20,
    fontSize: 20,
    color: WHITE
  },
  iconView: {
    position: 'absolute',
    right: 0,
    top: 20
  },
  icon: {
    fontSize: 28,
    color: WHITE,
    marginLeft: 10,
    marginRight: 10
  },
});

class NotePreviewScene extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconView} onPress={this.props.routeBack}>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
        <ScrollView>
          <Text style={styles.inputField}>{this.props.note}</Text>
        </ScrollView>
      </View>
    );
  }
}

NotePreviewScene.propTypes = {
  routeBack: PropTypes.func.isRequired,
  note: PropTypes.string
};

NotePreviewScene.defaultProps = {
  note: ''
};

export default NotePreviewScene;
