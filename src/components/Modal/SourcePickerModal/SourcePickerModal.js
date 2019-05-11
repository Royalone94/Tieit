// @flow

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './style';
import BaseComponent from '../../ModalPickerImage/BaseComponent';
import { formatNumber } from 'AppUtilities';
import { isEmpty } from 'lodash';
import ModalNavBar from '../ModalNavBar';

let componentIndex = 0;

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  data: [],
  onChange: () => {},
};

export default class SourcePickerModal extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      animationType: 'fade',
      modalVisible: false,
      transparent: false,
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onChange = (item) => {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
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

  renderOption = (itemData) => {
    const { item } = itemData;
    return (
      <TouchableOpacity key={item.id} onPress={() => this.onChange(item)}>
        <View style={styles.groupItemContainer}>
          <Text style={styles.groupName}>{item.name}</Text>
          {!isEmpty(item.lead_cost) &&
          <Text style={styles.groupAddedData}>
            ${formatNumber(item.lead_cost)} / {item.leads_cost_units.toLowerCase()}
          </Text>}
        </View>
      </TouchableOpacity>);
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
            title={'Select Source'}
            backAction={this.close}
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

SourcePickerModal.propTypes = propTypes;
SourcePickerModal.defaultProps = defaultProps;
