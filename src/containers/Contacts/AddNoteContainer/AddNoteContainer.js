// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import { BLACK, WHITE, LIGHT_GRAY, PRIMARY_COLOR, GRAY } from 'AppColors';
import { dismissKeyboard, AlertMessage, promisify } from 'AppUtilities';
import TopNavBar from './TopNavBar';
import { connectContacts } from 'AppRedux';
import { isEmpty } from 'lodash';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  inputField: {
    margin: 20,
    fontSize: 20,
    color: BLACK
  }
});

class AddNoteContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      note: '',
      pinned: true
    };

    this.onNoteChanged = ::this.onNoteChanged;
    this.onConfirm = ::this.onConfirm;
  }

  onConfirm() {
    const { note, pinned } = this.state;
    const { createNewNote, contactData, getContactNotes } = this.props;

    if (isEmpty(note)) {
      AlertMessage.showMessage(null, 'Please fill the notes.');
      return;
    }

    const pin_note = pinned ? 1 : 0;

    promisify(createNewNote, { contact_id: contactData.contact_id, note, pin_note })
      .then((msg) => {
        AlertMessage.showMessage(null, msg);
        promisify(getContactNotes, { contact_id: contactData.contact_id });
        this.setState({ note: '' });
      })
      .catch((msg) => AlertMessage.showMessage(null, msg));
  }

  onNoteChanged(e) {
    this.setState({ note: e });
  }

  render() {
    const { note } = this.state;

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <TopNavBar
            title={'Add Note'}
            backAction={this.props.routeBack}
            confirmAction={this.onConfirm}
          />
          <CheckBox
            title={'Pinned note'}
            checked={this.state.pinned}
            onPress={() => this.setState({ pinned: !this.state.pinned })}
            checkedColor={PRIMARY_COLOR}
            unCheckedColor={GRAY}
          />
          <TextInput
            ref={ref => this._notes = ref}
            style={styles.inputField}
            placeholder={'Add your notes...'}
            placeholderTextColor={LIGHT_GRAY}
            value={note}
            onChangeText={this.onNoteChanged}
            underlineColorAndroid={'transparent'}
            returnKeyType={'next'}
            multiline={true}
            autoCapitalize={'none'}
            autoCorrect={true}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddNoteContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  createNewNote: PropTypes.func.isRequired,
  getContactNotes: PropTypes.func.isRequired,
  contactData: PropTypes.object.isRequired
};

export default connectContacts()(AddNoteContainer);
