// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import { BLACK, WHITE, LIGHT_GRAY, GRAY, PRIMARY_COLOR } from 'AppColors';
import { dismissKeyboard, promisify, AlertMessage, formatDate } from 'AppUtilities';
import TopNavBar from './TopNavBar';
import {
  FloatingLabelTextInput,
  ModalPickerImage,
  CountryCodePicker,
  FloatingLabelPicker,
  CountryPickerModal,
  SourcePickerModal,
  CompanyPickerModal,
  MoreInfoPickerModal
} from 'AppComponents';
import { getAllCountries } from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
import {
  connectUser,
  connectContacts,
  connectSources,
  connectCountries,
  connectCompanies
} from 'AppRedux';
import { compose } from 'recompose';
import validator from 'validator';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { isEmpty, get } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginBottom: 20
  },
  content: {
    padding: 20
  },
  inputField: {
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: BLACK,
    height: 45,
    textAlign: 'left',
    marginBottom: 20
  },
  floatLabel: {
    fontSize: 12,
    color: GRAY
  },
  countryPicker: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  moreButton: {
    backgroundColor: WHITE,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 17,
    paddingHorizontal: 15
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR
  }
});

class EditContactContainer extends PureComponent {

  constructor(props) {
    super(props);

    console.log('selected contact = ', props.selectedContact);
    // eslint-disable-next-line max-len
    let primaryEmail = props.selectedContact.contact_data.email_address.filter((email) => email.primary).pop();
    primaryEmail = isEmpty(primaryEmail) ? '' : primaryEmail.email;

    // eslint-disable-next-line max-len
    let primaryPhone = props.selectedContact.contact_data.phone_number.filter((phone) => phone.number).pop();
    primaryPhone = isEmpty(primaryPhone) ? '' : primaryPhone.number;

    // eslint-disable-next-line max-len
    let primaryWebsite = props.selectedContact.contact_data.website.filter((site) => site.url).pop();
    primaryWebsite = isEmpty(primaryWebsite) ? '' : primaryWebsite.url;

    // eslint-disable-next-line max-len
    const primaryAddress = props.selectedContact.contact_data.address.filter((address) => address.type === 'primary').pop();
    // eslint-disable-next-line max-len
    const selectedSource = props.sources.filter((source) => source.id === props.selectedContact.contact_source_id).pop();
    // eslint-disable-next-line max-len
    const selectedCompany = props.companies.filter((company) => company.id === get(props.selectedContact, 'contact_company[0].company_id', '')).pop();

    const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    const userCountryData = getAllCountries()
      .filter((country) => country.cca2 === userLocaleCountryCode).pop();

    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    let selectedCountry = {};

    // eslint-disable-next-line max-len
    const contactCountry = props.countries.filter((country) => country.country_id === primaryAddress.country_id).pop();
    if (isEmpty(contactCountry)) {
      if (!cca2 || !userCountryData) {
        cca2 = 'US';
        callingCode = '1';
        selectedCountry = { label: 'United States', iso2: 'US' };
      } else {
        callingCode = userCountryData.callingCode;
        selectedCountry = { label: userCountryData.name.common, iso2: userCountryData.cca2 };
      }
    } else {
      // eslint-disable-next-line max-len
      const selectedCountryData = getAllCountries().filter((country) => country.cca2.toLowerCase() === contactCountry.country_code.toLowerCase()).pop();
      selectedCountry = { label: selectedCountryData.name.common, iso2: selectedCountryData.cca2 };
    }

    this.state = {
      firstName: props.selectedContact.first_name,
      lastName: props.selectedContact.last_name,
      middleName: props.selectedContact.middle_name,
      title: props.selectedContact.title,
      birthDate: props.selectedContact.date_of_birth,
      description: props.selectedContact.description,
      email: primaryEmail,
      phone: primaryPhone,
      webSite: primaryWebsite,
      countryCode: 1,
      addressLine1: !!primaryAddress ? primaryAddress.address_line1 : '',
      addressLine2: !!primaryAddress ? primaryAddress.address_line2 : '',
      stateProvince: {},
      selectedCountry,
      state: '',
      city: !!primaryAddress ? primaryAddress.city : '',
      selectedSource: !!selectedSource ? selectedSource : {},
      selectedCompany: !!selectedCompany ? selectedCompany : {},
      pickerData: [],
      cca2,
      callingCode,
      isDateTimePickerVisible: false,
      moreObjArray: [],
    };

    this.onPressFlag = ::this.onPressFlag;
    this.selectCountry = ::this.selectCountry;
    this.onValueChanged = ::this.onValueChanged;
    this.onConfirm = ::this.onConfirm;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        pickerData: this._phone._main.getPickerData()
      });
    }, 100);

    promisify(this.props.getCountries, null)
      .catch(() => {});

    // eslint-disable-next-line max-len
    this._phone._main.updateFlagAndFormatNumber(this.state.phone.replace(/ /g, '').replace(/[-]/g, ''));
  }

  onPressFlag() {
    this._countryPicker.open();
  }

  selectCountry(country) {
    this.setState({
      cca2: country.iso2,
      country: country.label,
      callingCode: country.dialCode,
      selectedCountry: country
    });
    this._phone._main.selectCountry(country.iso2);
  }

  onConfirm() {
    const { updateContact, countries, getContactList, getContactDetail } = this.props;

    if (!validator.isEmail(this.state.email)) {
      AlertMessage.showMessage(null, 'Valid email address is required.');
      return;
    }

    // if (!isEmpty(this.state.webSite) && !validator.isURL(this.state.webSite)) {
    //   AlertMessage.showMessage(null, 'Valid website link is required.');
    //   return;
    // }

    const params = {
      contact_id: this.props.selectedContact.contact_id,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      profile_pic: '',
      description: this.state.description,
      primary_email: this.state.email,
      primary_phone: this._phone._main.getValue(),
      primary_website: this.state.webSite,
      first_touch: formatDate(new Date()),
      title: this.state.title,
      // state: 1,
      visibility: 0
    };

    // eslint-disable-next-line max-len
    const selectedCountry = countries.filter((country) => country.country_code.toLowerCase() === this.state.selectedCountry.iso2.toLowerCase())[0];

    if (/* this.state.moreObjArray.indexOf('address') > -1 && */!isEmpty(selectedCountry)) {
      params.country = selectedCountry.country_id;
    }
    //
    // if (this.state.moreObjArray.indexOf('address') > -1) {
    params.city = this.state.city;
    params.address_line_1 = this.state.addressLine1;
    params.address_line_2 = this.state.addressLine2;
    // }

    if (/* this.state.moreObjArray.indexOf('sources') > -1 && */!isEmpty(this.state.selectedSource)) {
      params.source = this.state.selectedSource.id;
    }

    if (!isEmpty(this.state.selectedCompany)) {
      params.contact_company = this.state.selectedCompany.id;
    }

    // if (this.state.moreObjArray.indexOf('middle_name') > -1) {
    params.middle_name = this.state.middle_name;
    // }
    //
    // if (this.state.moreObjArray.indexOf('birth_date') > -1) {
    params.date_of_birth = this.state.birthDate;
    // }

    promisify(updateContact, params)
      .then((msg) => AlertMessage.showMessage(null, msg))
      .catch((msg) => AlertMessage.showMessage(null, msg))
      .finally(() => {
        promisify(getContactDetail, { contact_id: this.props.selectedContact.contact_id });
        promisify(getContactList, null);
      });
  }

  onValueChanged(e) {
    this.setState({ note: e });
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.setState({ birthDate: formatDate(date) });
    this.hideDateTimePicker();
  };

  onAddMoreInfo = (category) => {
    if (this.state.moreObjArray.indexOf(category) <= -1) {
      const moreObjArray = Object.assign([], this.state.moreObjArray);
      moreObjArray.push(category);
      this.setState({ moreObjArray });
      setTimeout(() => {
        this._contentView.scrollToEnd({ animated: true });
      }, 200);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <TopNavBar
            title={'Edit Contact'}
            backAction={this.props.routeBack}
            confirmAction={this.onConfirm}
          />
          <KeyboardAwareScrollView
            ref={ref => this._contentView = ref}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={styles.content}
          >
            <FloatingLabelTextInput
              ref={ref => this._firstName = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'First Name'}
              value={this.state.firstName}
              onValueChanged={(e) => this.setState({ firstName: e })}
              onSubmitEditing={() => {
                this._lastName._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._lastName = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Last Name'}
              value={this.state.lastName}
              onValueChanged={(e) => this.setState({ lastName: e })}
              onSubmitEditing={() => {
                this._birthDate._inputField.focus();
              }}
            />
            <FloatingLabelPicker
              ref={ref => this._birthDate = ref}
              value={this.state.birthDate}
              floatText={'Date of birth'}
              floatLabelStyle={styles.floatLabel}
              touchableCallback={this.showDateTimePicker}
              labelStyle={styles.countryPicker}
              onSubmitEditing={() => {
                this._title._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._title = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Title'}
              value={this.state.title}
              onValueChanged={(e) => this.setState({ title: e })}
              onSubmitEditing={() => {
                this._email._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._email = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Email'}
              value={this.state.email}
              onValueChanged={(e) => this.setState({ email: e })}
              onSubmitEditing={() => {
                this._webSite._inputField.focus();
              }}
            />
            <FloatingLabelPicker
              ref={ref => this._company = ref}
              value={this.state.selectedCompany.name}
              floatText={'Company'}
              floatLabelStyle={styles.floatLabel}
              touchableCallback={() => this._companyPicker.open()}
              labelStyle={styles.countryPicker}
            />
            <CountryCodePicker
              ref={ref => this._phone = ref}
              onPressFlag={this.onPressFlag}
              floatLabelStyle={styles.floatLabel}
              pickerStyle={{
                paddingTop: 15,
                paddingBottom: 15,
                marginBottom: 18,
                borderBottomWidth: 0.5,
                borderBottomColor: LIGHT_GRAY,
              }}
              floatText={'Phone'}
            />
            <FloatingLabelTextInput
              ref={ref => this._addressLine1 = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Address Line 1'}
              value={this.state.addressLine1}
              onValueChanged={(e) => this.setState({ addressLine1: e })}
              onSubmitEditing={() => {
                this._addressLine2._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._addressLine2 = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Address Line 2'}
              value={this.state.addressLine2}
              onValueChanged={(e) => this.setState({ addressLine2: e })}
              onSubmitEditing={() => {
                this._city._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._city = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'City'}
              value={this.state.city}
              onValueChanged={(e) => this.setState({ city: e })}
              onSubmitEditing={() => {
                this._webSite._inputField.focus();
              }}
            />
            <FloatingLabelPicker
              ref={ref => this._stateProvince = ref}
              value={this.state.stateProvince.name}
              floatText={'State / Province'}
              floatLabelStyle={styles.floatLabel}
              touchableCallback={() => {}}
              labelStyle={styles.countryPicker}
            />
            <FloatingLabelPicker
              ref={ref => this._country = ref}
              value={this.state.selectedCountry.label}
              floatText={'Country'}
              floatLabelStyle={styles.floatLabel}
              touchableCallback={() => this._countryNamePicker.open()}
              labelStyle={styles.countryPicker}
            />
            <FloatingLabelTextInput
              ref={ref => this._webSite = ref}
              inputStyle={styles.inputField}
              floatLabelStyle={styles.floatLabel}
              floatText={'Website'}
              value={this.state.webSite}
              onValueChanged={(e) => this.setState({ webSite: e })}
              onSubmitEditing={() => {
                this._description._inputField.focus();
              }}
            />
            <FloatingLabelTextInput
              ref={ref => this._description = ref}
              inputStyle={[styles.inputField, { height: 50 }]}
              floatLabelStyle={styles.floatLabel}
              floatText={'Description'}
              value={this.state.description}
              onValueChanged={(e) => this.setState({ description: e })}
            />
            <FloatingLabelPicker
              ref={ref => this._sources = ref}
              value={this.state.selectedSource.name}
              floatText={'Source'}
              floatLabelStyle={styles.floatLabel}
              touchableCallback={() => this._sourcePicker.open()}
              labelStyle={styles.countryPicker}
            />
            {this.state.moreObjArray.map((category) => {
              if (category === 'middle_name') {
                return (
                  <FloatingLabelTextInput
                    key={`more-${category}`}
                    ref={ref => this._middleName = ref}
                    inputStyle={styles.inputField}
                    floatLabelStyle={styles.floatLabel}
                    floatText={'Middle Name'}
                    value={this.state.middleName}
                    onValueChanged={(e) => this.setState({ middleName: e })}
                  />
                );
              } else if (category === 'birth_date') {
                return (
                  <FloatingLabelPicker
                    key={`more-${category}`}
                    ref={ref => this._birthDate = ref}
                    value={this.state.birthDate}
                    floatText={'Date of birth'}
                    floatLabelStyle={styles.floatLabel}
                    touchableCallback={this.showDateTimePicker}
                    labelStyle={styles.countryPicker}
                  />
                );
              } else if (category === 'address') {
                return (
                  <View key={`more-${category}`}>
                    <FloatingLabelPicker
                      ref={ref => this._country = ref}
                      value={this.state.selectedCountry.label}
                      floatText={'Country'}
                      floatLabelStyle={styles.floatLabel}
                      touchableCallback={() => this._countryNamePicker.open()}
                      labelStyle={styles.countryPicker}
                    />
                    <FloatingLabelTextInput
                      ref={ref => this._city = ref}
                      inputStyle={styles.inputField}
                      floatLabelStyle={styles.floatLabel}
                      floatText={'City'}
                      value={this.state.city}
                      onValueChanged={(e) => this.setState({ city: e })}
                    />
                  </View>
                );
              } else if (category === 'sources') {
                return (
                  <FloatingLabelPicker
                    key={`more-${category}`}
                    ref={ref => this._source = ref}
                    value={this.state.selectedSource.name}
                    floatText={'Source'}
                    floatLabelStyle={styles.floatLabel}
                    touchableCallback={() => this._sourcePicker.open()}
                    labelStyle={styles.countryPicker}
                  />
                );
              }
              return null;
            })}
            {false && <TouchableOpacity
              onPress={() => this._moreInfoPicker.open()}
              style={styles.moreButton}
            >
              <Text style={styles.moreButtonText}>ADD MORE INFO</Text>
            </TouchableOpacity>}
          </KeyboardAwareScrollView>
          <ModalPickerImage
            ref={ref => this._countryPicker = ref}
            data={this.state.pickerData}
            onChange={(countryName) => this.selectCountry(countryName)}
            cancelText={'Close'}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <CountryPickerModal
            ref={ref => this._countryNamePicker = ref}
            data={this.state.pickerData}
            onChange={(selectedCountry) => {
              this.setState({ selectedCountry });
              this._phone._main.selectCountry(selectedCountry.iso2);
            }}
            cancelText={'Close'}
          />
          <SourcePickerModal
            ref={ref => this._sourcePicker = ref}
            data={this.props.sources}
            onChange={(selectedSource) => {
              this.setState({ selectedSource });
            }}
          />
          <CompanyPickerModal
            ref={ref => this._companyPicker = ref}
            data={this.props.companies}
            onChange={(selectedCompany) => {
              this.setState({ selectedCompany });
            }}
            cancelText={'Close'}
          />
          <MoreInfoPickerModal
            ref={ref => this._moreInfoPicker = ref}
            onSelect={this.onAddMoreInfo}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

EditContactContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  selectedContact: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  contacts: PropTypes.object.isRequired,
  createNewContact: PropTypes.func.isRequired,
  getContactList: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  getCountries: PropTypes.func.isRequired,
  getContactDetail: PropTypes.func.isRequired
};

export default compose(
  connectUser(),
  connectSources(),
  connectContacts(),
  connectCountries(),
  connectCompanies()
)(EditContactContainer);
