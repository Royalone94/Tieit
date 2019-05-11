// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { BLACK, WHITE, GRAY, LIGHT_GRAY, GREEN } from 'AppColors';
import { dismissKeyboard } from 'AppUtilities';
import { WINDOW_WIDTH } from 'AppConstants';
import TopNavBar from './TopNavBar';

import {
  connectUser,
  connectContacts,
  connectDeals
} from 'AppRedux';

import {
  FloatingLabelTextInput,
  MarkableTextView,
  FloatingLabelPicker,
  ActivityType,
  ActivityTypePickerModal
} from 'AppComponents';

import { compose } from 'recompose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-checkbox-heaven';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7'
  },
  content: {
    backgroundColor: WHITE
  },
  horizontalView: {
    flexDirection: 'row'
  },
  typeView: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRightWidth: 0.3,
    borderRightColor: GRAY,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    backgroundColor: '#f7f6f7'
  },
  typeIconView: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6C0D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeIcon: {
    fontSize: 16,
    color: WHITE,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 24,
    color: BLACK,
    alignSelf: 'center',
  },
  typeLabel: {
    fontSize: 16,
    color: BLACK,
    alignSelf: 'center',
    marginLeft: 10
  },
  assigneeView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRightWidth: 0.3,
    borderRightColor: GRAY,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    backgroundColor: '#f7f6f7',
    overflow: 'hidden'
  },
  assigneeLabel: {
    fontSize: 14,
    color: GRAY,
    alignSelf: 'center',
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'center',
    marginRight: 5,
    backgroundColor: 'transparent'
  },
  contentView: {
    padding: 15,
    paddingBottom: 0
  },
  dateTimeView: {
    flex: 1,
  },
  hintLabel: {
    color: GRAY,
    fontSize: 14
  },
  label: {
    color: BLACK,
    fontSize: 16,
    marginTop: 5
  },
  inputField: {
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: BLACK,
    height: 45,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: -5
  },
  floatLabel: {
    fontSize: 14,
    color: GRAY,
    marginTop: 5
  },
  grayUnderline: {
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    paddingBottom: 10,
    marginBottom: 10
  },
  answerView: {
    flex: 1,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    paddingVertical: 15,
  },
  picker: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  footer: {
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: GREEN,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: WHITE,
    width: WINDOW_WIDTH - 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 45
  },
  buttonText: {
    fontSize: 18,
    color: WHITE
  },
});

class AddActivityContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      taskTitle: '',
      answered: false,
      voiceMail: false,
      description: '',
      contact: {},
      deal: {},
      doNotBlock: false
    };
  }
  onConfirm = () => {
  }

  onSelectActivity = () => {

  }

  renderHeader = () => {
    return (
      <View style={styles.horizontalView}>
        <View style={styles.typeView}>
          <ActivityType
            text={'CALL'}
            iconName={'phone'}
          />
          <TouchableOpacity
            onPress={() => this._activityTypePicker.open()}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          >
            <Icon name="keyboard-arrow-down" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.assigneeView}>
          <Text style={styles.assigneeLabel}>Assignee</Text>
          <Image
            style={styles.avatarImage}
            resizeMode={'contain'}
            source={require('img/images/avatar.png')}
          />
        </View>
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={styles.contentView}>
        <View style={[styles.horizontalView, styles.grayUnderline]}>
          <View style={styles.dateTimeView}>
            <Text style={styles.hintLabel}>Date</Text>
            <Text style={styles.label}>07/29/2017</Text>
          </View>
          <View style={styles.dateTimeView}>
            <Text style={styles.hintLabel}>Time</Text>
            <Text style={styles.label}>05:24 PM</Text>
          </View>
          <View style={styles.dateTimeView}>
            <Text style={styles.hintLabel}>Duration</Text>
            <Text style={styles.label}>00:15</Text>
          </View>
        </View>
        <FloatingLabelTextInput
          ref={ref => this._lastName = ref}
          inputStyle={styles.inputField}
          floatLabelStyle={styles.floatLabel}
          floatText={'Last Name'}
          value={this.state.taskTitle}
          onValueChanged={(e) => this.setState({ taskTitle: e })}
          onSubmitEditing={() => {
            this._description._inputField.focus();
          }}
        />
        <Text style={styles.hintLabel}>Call Status</Text>
        <View style={[styles.horizontalView, { marginTop: 10 }]}>
          <MarkableTextView
            text={'Answered'}
            marked={this.state.answered}
            style={[styles.answerView, { marginRight: 5 }]}
            touchable={true}
            onPress={() => this.setState({ answered: true })}
          />
          <MarkableTextView
            text={'Not Answered'}
            marked={!this.state.answered}
            style={[styles.answerView, { marginLeft: 5 }]}
            touchable={true}
            onPress={() => this.setState({ answered: false })}
          />
        </View>
        <CheckBox
          label={'Left Voicemail'}
          style={{ marginTop: 15, marginBottom: 5 }}
          checked={this.state.voiceMail}
          iconName={'matMix'}
          iconSize={28}
          onChange={(checked) => this.setState({ voiceMail: checked })}
        />
        <FloatingLabelTextInput
          ref={ref => this._description = ref}
          inputStyle={styles.inputField}
          floatLabelStyle={styles.floatLabel}
          floatText={'Description'}
          value={this.state.description}
          onValueChanged={(e) => this.setState({ description: e })}
        />
        <FloatingLabelPicker
          ref={ref => this._contact = ref}
          value={this.state.contact.name}
          floatText={'Contact'}
          floatLabelStyle={styles.floatLabel}
          touchableCallback={() => {}}
          labelStyle={styles.picker}
        />
        <FloatingLabelPicker
          ref={ref => this._deal = ref}
          value={this.state.deal.name}
          floatText={'Associate with Deal'}
          floatLabelStyle={styles.floatLabel}
          touchableCallback={() => {}}
          labelStyle={styles.picker}
        />
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <CheckBox
          label={'Do not block the time in scheduling'}
          style={{ marginTop: 15 }}
          checked={this.state.doNotBlock}
          iconName={'matMix'}
          iconSize={28}
          onChange={(checked) => this.setState({ doNotBlock: checked })}
        />
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <TopNavBar
            title={'Add Activity'}
            backAction={this.props.routeBack}
            confirmAction={this.onConfirm}
          />
          {this.renderHeader()}
          <ScrollView
            ref={ref => this._contentView = ref}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={styles.content}
          >
            {this.renderContent()}
          </ScrollView>
          {this.renderFooter()}
          <ActivityTypePickerModal
            ref={ref => this._activityTypePicker = ref}
            onSelect={this.onSelectActivity}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddActivityContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  deals: PropTypes.array.isRequired,
};

export default compose(
  connectUser(),
  connectContacts(),
  connectDeals()
)(AddActivityContainer);
