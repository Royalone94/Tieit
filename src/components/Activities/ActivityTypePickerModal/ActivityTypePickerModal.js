// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

let componentIndex = 0;

const propTypes = {
  onSelect: PropTypes.func,
};

const defaultProps = {
  onSelect: () => {},
};

export default class ActivityTypePickerModal extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      animationType: 'fade',
      modalVisible: false,
      transparent: false,
    };
  }

  close = () => {
    this.setState({
      modalVisible: false
    });
  }

  open = () => {
    this.setState({
      modalVisible: true
    });
  }

  onSelect = (category) => {
    this.props.onSelect(category);
    this.close();
  }

  renderContent = () => {
    return (
      <TouchableWithoutFeedback onPress={this.close}>
        <View
          style={styles.overlayStyle}
          key={`modalPicker${(componentIndex++)}`}
        >
          <TouchableWithoutFeedback>
            <View style={styles.optionContainer}>
              <Text style={styles.title}>Choose Activity</Text>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => this.onSelect('middle_name')}
              >
                <Icon name="person" style={styles.itemIcon} />
                <Text style={styles.itemLabel}>Middle Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => this.onSelect('birth_date')}
              >
                <Icon name="date-range" style={styles.itemIcon} />
                <Text style={styles.itemLabel}>Date of Birth</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => this.onSelect('address')}
              >
                <Icon name="home" style={styles.itemIcon} />
                <Text style={styles.itemLabel}>Address</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => this.onSelect('groups')}
              >
                <Icon name="group" style={styles.itemIcon} />
                <Text style={styles.itemLabel}>Groups</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => this.onSelect('sources')}
              >
                <Icon name="input" style={styles.itemIcon} />
                <Text style={styles.itemLabel}>Sources</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    return null;
  }

  render() {
    const dp = (
      <Modal
        transparent={true}
        ref="modal"
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderContent()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}
        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

ActivityTypePickerModal.propTypes = propTypes;
ActivityTypePickerModal.defaultProps = defaultProps;
