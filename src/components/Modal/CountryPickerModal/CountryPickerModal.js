// @flow

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import styles from './style';
import BaseComponent from '../../ModalPickerImage/BaseComponent';

let componentIndex = 0;

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  initValue: PropTypes.string,
  style: View.propTypes.style,
  selectStyle: View.propTypes.style,
  optionStyle: View.propTypes.style,
  optionTextStyle: Text.propTypes.style,
  sectionStyle: View.propTypes.style,
  sectionTextStyle: Text.propTypes.style,
  cancelStyle: View.propTypes.style,
  cancelTextStyle: Text.propTypes.style,
  overlayStyle: View.propTypes.style,
  cancelText: PropTypes.string
};

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel'
};

export default class CountryPickerModal extends BaseComponent {

  constructor(props) {
    super(props);

    this._bind(
      'onChange',
      'open',
      'close',
      'renderChildren'
    );

    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selected: props.initValue,
      cancelText: props.cancelText,
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false
    });
  }

  open() {
    this.setState({
      modalVisible: true
    });
  }

  renderSection(section) {
    return (
      <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
      </View>
    );
  }

  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View style={[styles.optionStyle, this.props.optionStyle, {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }]}
        >
          <View style={{ flex: 0.15 }}>
            <Image source={option.image} resizeMode={'stretch'} style={{ width: 30, height: 16 }} />
          </View>
          <View style={{ flex: 0.85, alignItems: 'center' }}>
            <Text style={[styles.optionTextStyle, this.props.optionTextStyle, {
              color: '#434343',
              fontSize: 14
            }]}
            >
              {option.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>);
  }

  renderOptionList() {
    const options = this.state.data.map((item) => {
      if (item.section) {
        return this.renderSection(item);
      }
      return this.renderOption(item);
    });

    return (
      <View
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${(componentIndex++)}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={{ paddingHorizontal: 10 }}>
              {options}
            </View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>);
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

CountryPickerModal.propTypes = propTypes;
CountryPickerModal.defaultProps = defaultProps;
