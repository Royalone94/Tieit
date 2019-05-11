// @flow

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import styles from './style';
import BaseComponent from '../../ModalPickerImage/BaseComponent';
import ModalNavBar from '../ModalNavBar';
import { MaterialCheckBox } from 'AppComponents';

let componentIndex = 0;

const propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  selectedGroups: PropTypes.array,
};

const defaultProps = {
  data: [],
  onSelect: () => {},
  selectedGroups: [],
};

export default class GroupPickerModal extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selectedGroups: props.selectedGroups,
      data: props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data
      || nextProps.selectedGroups !== this.props.selectedGroups) {
      this.setState({
        data: nextProps.data,
        selectedGroups: nextProps.selectedGroups
      });
    }
  }

  onSelect = () => {
    this.props.onSelect(this.state.selectedGroups);
    this.close();
  }

  close = () => {
    this.setState({
      modalVisible: false,
      selectedGroups: this.props.selectedGroups
    });
  }

  open = () => {
    this.setState({
      modalVisible: true
    });
  }

  renderOption = (itemData) => {
    const { item } = itemData;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const selected = this.state.selectedGroups.indexOf(item.id) > -1;
          const groups = Object.assign([], this.state.selectedGroups);
          if (!selected) {
            groups.push(item.id);
          } else {
            const index = groups.indexOf(item.id);
            if (index > -1) {
              groups.splice(index, 1);
            }
          }
          this.setState({ selectedGroups: groups });
        }}
      >
        <View style={styles.groupItemContainer}>
          <MaterialCheckBox
            size={40}
            selected={this.state.selectedGroups.indexOf(item.id) > -1}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupAddedData}>{item.added_date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>);
  }

  keyExtractor = (item) => item.id;

  renderOptionList = () => {
    return (
      <View
        style={styles.overlayStyle}
        key={`modalPicker${(componentIndex++)}`}
      >
        <View style={styles.optionContainer}>
          <ModalNavBar
            title={'Select Groups'}
            backAction={this.close}
            confirmAction={this.onSelect}
          />
          <FlatList
            data={this.state.data}
            renderItem={this.renderOption}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    );
  }

  renderChildren() {
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
        {this.renderOptionList()}
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

GroupPickerModal.propTypes = propTypes;
GroupPickerModal.defaultProps = defaultProps;
