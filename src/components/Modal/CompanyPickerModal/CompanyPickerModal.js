// @flow

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

import styles from './style';
import BaseComponent from '../../ModalPickerImage/BaseComponent';
import ModalNavBar from '../ModalNavBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isEmpty } from 'lodash';

let componentIndex = 0;

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  data: [],
  onChange: () => {},
};

export default class CompanyPickerModal extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      animationType: 'slide',
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
          {!isEmpty(item.company_phone) &&
          <View style={styles.phoneView}>
            <Icon name="phone" style={styles.phoneIcon} />
            <Text style={styles.groupAddedData}>
              {item.company_phone}
            </Text>
          </View>}
        </View>
      </TouchableOpacity>
    );
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
            title={'Select Company'}
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

CompanyPickerModal.propTypes = propTypes;
CompanyPickerModal.defaultProps = defaultProps;
