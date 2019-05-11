// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Clipboard
} from 'react-native';

import { BLACK, WHITE, GRAY, LIGHT_GRAY, PRIMARY_COLOR } from 'AppColors';
import { isEmpty, isNumber, get, set } from 'lodash';
import MapView from 'react-native-maps';
import {
  ExtendableView,
  GroupPickerModal
} from 'AppComponents';
import { WINDOW_WIDTH, GOOGLE_MAP_KEY } from 'AppConstants';
import {
  promisify,
  generateFullName,
  formatDate,
  AlertMessage
} from 'AppUtilities';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Communications from 'react-native-communications';
import * as Progress from 'react-native-progress';
import Geocoder from 'react-native-geocoder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  sectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f7f6f7',
    color: BLACK
  },
  sectionView: {
    backgroundColor: WHITE,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15,
    borderBottomColor: LIGHT_GRAY,
    borderBottomWidth: 0.5
  },
  floatingText: {
    color: GRAY,
    fontSize: 12,
    marginTop: 10
  },
  blueText: {
    color: '#0068d3',
    fontSize: 14,
    marginTop: 10
  },
  addressText: {
    color: BLACK,
    fontSize: 14,
    marginTop: 10
  },
  horizontalView: {
    flex: 1,
    flexDirection: 'row'
  },
  separator: {
    width: WINDOW_WIDTH,
    height: 0.5,
    backgroundColor: LIGHT_GRAY
  },
  infoTitle: {
    color: GRAY,
    fontSize: 14,
    marginBottom: 3
  },
  infoName: {
    color: BLACK,
    fontSize: 16,
    marginBottom: 3
  },
  infoDate: {
    color: BLACK,
    fontSize: 12,
    marginBottom: 5
  },
  underline: {
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
    marginBottom: 8
  },
  moreView: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  moreButton: {
    paddingVertical: 10,
    marginRight: 20,
    color: GRAY,
    fontSize: 14,
    fontWeight: 'bold'
  },
  moreIcon: {
    color: GRAY,
    fontSize: 16,
    marginRight: 10
  },
  moreTouchableView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  groupName: {
    fontSize: 12,
    marginTop: 5,
    color: BLACK
  },
  groupJoinedDate: {
    fontSize: 10,
    marginTop: 2,
    paddingBottom: 5,
    color: GRAY
  }
});

class ContactDetailTab extends PureComponent {

  constructor(props) {
    super(props);

    if (!isEmpty(props.contactData)) {
      const { contact_data } = props.contactData;
      const validWebsites = contact_data.website.filter((site) => !isEmpty(site.url));

      const validEmails = contact_data.email_address.filter((email) => !isEmpty(email.email));
      const initialEmail = [];
      let moreEmail = false;
      if (validEmails.length > 0) {
        initialEmail.push(validEmails[0]);
        if (validEmails.length > 1) {
          moreEmail = true;
        }
      }

      const validPhones = contact_data.phone_number.filter((phone) => !isEmpty(phone.number));
      const initialPhone = [];
      let morePhone = false;
      if (validPhones.length > 0) {
        initialPhone.push(validPhones[0]);
        if (validPhones.length > 1) {
          morePhone = true;
        }
      }

      const validMaps = contact_data.address.filter((map) => !isEmpty(map.type));
      const initialMap = [];
      let moreMap = false;
      if (validMaps.length > 0) {
        initialMap.push(validMaps[0]);
        if (validMaps.length > 1) {
          moreMap = true;
        }
      }

      this.state = {
        moreEmail,
        initialEmail,
        validEmails,
        morePhone,
        initialPhone,
        validPhones,
        moreMap,
        initialMap,
        validMaps,
        validWebsites,
        showMoreEmail: false,
        showMorePhone: false,
        showMoreMap: false,
        refreshing: false,
        isChecking: false,
        positions: {}
      };

      this.getGeolocations();
    } else {
      this.state = {
        refreshing: false,
        isChecking: false,
        positions: {}
      };
    }
  }

  componentWillMount() {
    Geocoder.fallbackToGoogle(GOOGLE_MAP_KEY);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.contactData)) {
      const { contact_data } = nextProps.contactData;
      const validWebsites = contact_data.website.filter((site) => !isEmpty(site.url));

      const validEmails = contact_data.email_address.filter((email) => !isEmpty(email.email));
      const initialEmail = [];
      let moreEmail = false;
      if (validEmails.length > 0) {
        initialEmail.push(validEmails[0]);
        if (validEmails.length > 1) {
          moreEmail = true;
        }
      }

      const validPhones = contact_data.phone_number.filter((phone) => !isEmpty(phone.number));
      const initialPhone = [];
      let morePhone = false;
      if (validPhones.length > 0) {
        initialPhone.push(validPhones[0]);
        if (validPhones.length > 1) {
          morePhone = true;
        }
      }

      const validMaps = contact_data.address.filter((map) => !isEmpty(map.country_name));
      const initialMap = [];
      let moreMap = false;
      if (validMaps.length > 0) {
        initialMap.push(validMaps[0]);
        if (validMaps.length > 1) {
          moreMap = true;
        }
      }
      this.getGeolocations();

      this.setState({
        moreEmail,
        initialEmail,
        validEmails,
        morePhone,
        initialPhone,
        validPhones,
        moreMap,
        initialMap,
        validMaps,
        validWebsites,
        showMoreEmail: false,
        showMorePhone: false,
        showMoreMap: false
      });
    }
  }

  getGeolocations = async () => {
    if (!!this.state.validMaps) {
      this.state.validMaps.map((address) => {
        let countryName = '';
        if (!isEmpty(address.state_name)) {
          countryName = `${address.state_name}, `;
        }
        if (!isEmpty(address.country_name)) {
          countryName = `${countryName}${address.country_name}`;
        }
        // eslint-disable-next-line max-len
        const fullAddress = `${address.address_line1}, ${address.address_line2}, ${address.city}, ${countryName}`;
        this.getGeolocation(fullAddress);
        return null;
      });
    }
  }

  getGeolocation = async (address) => {
    try {
      const res = await Geocoder.geocodeAddress(address);
      const pos = Object.assign({}, this.state.position);
      set(pos, address, res[0].position);
      this.setState({ position: pos });
    } catch (err) {
      console.log('error = ', err);
    }
  }

  onRefresh = () => {
    const { callBack, contactId } = this.props;

    if (callBack) {
      this.setState({ refreshing: true });

      promisify(callBack, { contact_id: contactId })
        .catch(() => {})
        .finally(() => {
          this.setState({ refreshing: false });
        });
    }
  }

  callPhoneNumber = (phone_number) => {
    Communications.phonecall(phone_number.replace(/[-]/g, '').replace(/[+]/g, '').replace(/ /g, ''),
      true);
  }

  sendEmail = (email) => {
    // Communications.email([email], null, null, 'My Subject', 'My body text');
    Clipboard.setString(email);
    AlertMessage.showMessage(null, 'Email is saved.');
  }

  onExpand = () => {
    setTimeout(() => {
      this._contentView.scrollToEnd({ animated: true });
    }, 200);
  }

  onSelectGroup = (groups) => {
    if (groups.length > 0) {
      this.setState({ isChecking: true });

      promisify(this.props.addContactToGroup, {
        contact_id: this.props.contactData.contact_id,
        groups: groups.join()
      }).then((msg) => AlertMessage.showMessage(null, msg))
        .catch((msg) => AlertMessage.showMessage(null, msg))
        .finally(() => {
          this.setState({ isChecking: false });
          promisify(this.props.callBack, { contact_id: this.props.contactId })
            .catch(() => {});
        });
    }
  }

  renderAdditionalInfo = () => {
    const { contactData, sources, user } = this.props;

    const currentUserFullName = generateFullName(user.first_name, user.last_name);

    const contact_source_id = contactData.contact_source_id;
    const selectedSource = sources.filter((source) => source.id === contact_source_id).pop();

    return (
      <ExtendableView
        title="Additional Information"
        onStatusChanged={this.onExpand}
      >
        {!isEmpty(contactData.created_by) &&
        <View style={styles.underline}>
          <Text style={styles.infoTitle}>Created By</Text>
          <Text style={styles.infoName}>
            {contactData.created_by}
            {contactData.created_by === currentUserFullName
              ? ' (you)'
              : ''}
          </Text>
          <Text style={styles.infoDate}>
            {moment(new Date(contactData.first_touch * 1000)).format('MMM DD, YYYY h:mm a')}
          </Text>
        </View>
        }
        {!isEmpty(contactData.modified_by) &&
        <View style={styles.underline}>
          <Text style={styles.infoTitle}>Last Modified By</Text>
          <Text style={styles.infoName}>
            {contactData.modified_by}
            {contactData.modified_by === currentUserFullName
              ? ' (you)'
              : ''}
          </Text>
          <Text style={styles.infoDate}>
            {moment(new Date(contactData.modified * 1000)).format('MMM DD, YYYY h:mm a')}
          </Text>
        </View>
        }
        {!isEmpty(selectedSource) &&
        <View>
          <Text style={styles.infoTitle}>Source</Text>
          <Text style={styles.infoName}>{selectedSource.name}</Text>
        </View>
        }
      </ExtendableView>
    );
  }

  render() {
    const { contactData } = this.props;
    if (isEmpty(contactData)) {
      return null;
    }

    const {
      moreEmail,
      initialEmail,
      validEmails,
      morePhone,
      initialPhone,
      validPhones,
      moreMap,
      initialMap,
      validMaps,
      validWebsites,
      showMoreEmail,
      showMorePhone,
      showMoreMap,
      refreshing
    } = this.state;

    const showEmail = showMoreEmail ? validEmails : initialEmail;
    const showPhone = showMorePhone ? validPhones : initialPhone;
    const showMap = showMoreMap ? validMaps : initialMap;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={ref => this._contentView = ref}
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <Text style={styles.sectionHeader}>CONTACT INFO</Text>
          {!isEmpty(showEmail) &&
            <View style={styles.sectionView}>
              <Text style={styles.floatingText}>Email</Text>
              {showEmail.map((email) => {
                return (
                  <TouchableOpacity
                    key={email.email}
                    onPress={() => this.sendEmail(email.email)}
                  >
                    <Text style={styles.blueText}>
                      {email.email}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          {moreEmail &&
            <View style={styles.moreView}>
              <TouchableOpacity
                style={styles.moreTouchableView}
                onPress={() => this.setState({ showMoreEmail: !showMoreEmail })}
              >
                {!showMoreEmail &&
                <Icon name="more-horiz" style={styles.moreIcon} />
                }
                <Text style={styles.moreButton}>{showMoreEmail ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
          }
          {!isEmpty(showPhone) &&
            <View style={styles.sectionView}>
              <Text style={styles.floatingText}>Phone</Text>
              {showPhone.map((phone) => {
                return (
                  <TouchableOpacity
                    key={phone.number}
                    onPress={() => this.callPhoneNumber(phone.number)}
                  >
                    <Text style={styles.blueText}>
                      {phone.number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          {morePhone &&
            <View style={styles.moreView}>
              <TouchableOpacity
                style={styles.moreTouchableView}
                onPress={() => this.setState({ showMorePhone: !showMorePhone })}
              >
                {!showMorePhone &&
                <Icon name="more-horiz" style={styles.moreIcon} />
                }
                <Text style={styles.moreButton}>{showMorePhone ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
          }
          {!isEmpty(contactData.contact_data.fax_number) &&
            <View style={styles.sectionView}>
              <Text style={styles.floatingText}>Fax</Text>
              <Text style={styles.addressText}>
                {contactData.contact_data.fax_number}
              </Text>
            </View>
          }
          {!isEmpty(validWebsites) &&
            <View style={styles.sectionView}>
              <Text style={styles.floatingText}>Website</Text>
              {validWebsites.map((site) => {
                return (
                  <Text key={site.url} style={styles.addressText}>{site.url}</Text>
                );
              })}
            </View>
          }
          {!isEmpty(showMap) && <Text style={styles.sectionHeader}>ADDRESS INFORMATION</Text>}
          {!isEmpty(showMap) && showMap.map((address, index) => {
            let countryName = '';
            if (!isEmpty(address.state_name)) {
              countryName = `${address.state_name}, `;
            }
            if (!isEmpty(address.country_name)) {
              countryName = `${countryName}${address.country_name}`;
            }
            const workType =
              `${address.type.charAt(0).toUpperCase()}${address.type.slice(1)} Address`;
            // eslint-disable-next-line max-len
            const fullAddress = `${address.address_line1}, ${address.address_line2}, ${address.city}, ${countryName}`;
            const position = get(this.state.position, fullAddress);
            return (
              <View
                key={index}
                style={[styles.sectionView, styles.horizontalView, { marginTop: 15 }]}
              >
                <View style={{ flex: 0.6 }}>
                  <Text style={[styles.floatingText, { marginTop: 0 }]}>{workType}</Text>
                  {!isEmpty(address.address_line1) &&
                  <Text style={styles.addressText}>{address.address_line1}</Text>}
                  {!isEmpty(address.address_line2) &&
                  <Text style={styles.addressText}>{address.address_line2}</Text>}
                  {!isEmpty(address.city) &&
                  <Text style={styles.addressText}>{address.city}</Text>}
                  {!isEmpty(countryName) &&
                  <Text style={styles.addressText}>{countryName}</Text>}
                </View>
                <View style={{ flex: 0.4, height: 100 }}>
                  <MapView
                    style={{ flex: 1 }}
                    region={{
                      latitude: !!position ? position.lat : 37.78825,
                      longitude: !!position ? position.lng : -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  />
                </View>
              </View>
            );
          })}
          {moreMap &&
            <View style={styles.moreView}>
              <TouchableOpacity
                style={styles.moreTouchableView}
                onPress={() => this.setState({ showMoreMap: !showMoreMap })}
              >
                {!showMoreMap &&
                  <Icon name="more-horiz" style={styles.moreIcon} />
                }
                <Text style={styles.moreButton}>{showMoreMap ? 'Less' : 'More'}</Text>
              </TouchableOpacity>
            </View>
          }
          <Text style={styles.sectionHeader} />
          <ExtendableView
            title="Social Information"
            disabled={isEmpty(contactData.social)}
          >
            <Text>Require design</Text>
          </ExtendableView>
          <ExtendableView
            title={`Groups (${contactData.groups.length})`}
            additionalTitle="Add to Group"
            onOptionalClicked={() => this._groupPicker.open()}
            disabled={contactData.groups.length === 0}
          >
            {contactData.groups.map((groupData) => {
              const date = isNumber(groupData.group_join_date)
                ? new Date(groupData.group_join_date * 1000)
                : null;
              return (
                <View key={groupData.group_id} style={styles.underline}>
                  <Text style={styles.groupName}>{groupData.group_name}</Text>
                  {!!date
                    ? <Text style={styles.groupJoinedDate}>Joined on: {formatDate(date)}</Text>
                    : <Text style={styles.groupJoinedDate}>Not Joined</Text>
                  }
                </View>
              );
            })}
          </ExtendableView>
          <ExtendableView
            title={`Lists (${contactData.lists.length})`}
            disabled={contactData.lists.length === 0}
          >
            {contactData.lists.map((listData) => {
              const date = isNumber(listData.list_join_date)
                ? new Date((listData.list_join_date) * 1000)
                : null;
              return (
                <View key={listData.list_id} style={styles.underline}>
                  <Text style={styles.groupName}>{listData.list_name}</Text>
                  {!!date
                    ? <Text style={styles.groupJoinedDate}>Joined on: {formatDate(date)}</Text>
                    : <Text style={styles.groupJoinedDate}>Not Joined</Text>
                  }
                </View>
              );
            })}
          </ExtendableView>
          <Text style={styles.sectionHeader} />
          {this.renderAdditionalInfo()}
          <GroupPickerModal
            ref={ref => this._groupPicker = ref}
            data={this.props.groups}
            onSelect={this.onSelectGroup}
          />
          {this.state.isChecking &&
          <View style={styles.progressView}>
            <Progress.Circle
              indeterminate={true}
              color={PRIMARY_COLOR}
              size={40}
              thickness={4}
              borderWidth={2}
            />
          </View>}
        </ScrollView>
      </View>
    );
  }
}

ContactDetailTab.propTypes = {
  user: PropTypes.object.isRequired,
  contactData: PropTypes.object,
  groups: PropTypes.array.isRequired,
  sources: PropTypes.array.isRequired,
  contactId: PropTypes.number.isRequired,
  callBack: PropTypes.func.isRequired,
  addContactToGroup: PropTypes.func.isRequired,
};

ContactDetailTab.defaultProps = {
  contactData: {},
};

export default ContactDetailTab;
