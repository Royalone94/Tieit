// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native';

import {
  ContactTimeLineTab,
  MainActionSheet,
  ContactDealsTab,
  ContactNotesTab,
  ContactDetailTab
} from 'AppComponents';
import {
  BLACK,
  WHITE,
  GREEN,
  PRIMARY_COLOR,
  GRAY
} from 'AppColors';
import {
  connectContacts,
  connectUser,
  connectCompanies,
  connectGroups,
  connectSources,
  connectDeals
} from 'AppRedux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { generateFullName, promisify } from 'AppUtilities';
import { TopNav } from './subComponents';
import { isEmpty, get } from 'lodash';
import { compose } from 'recompose';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

import { testData } from './test-data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: WHITE
  },
  tabBarLabelStyle: {
    color: BLACK,
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 0
  },
  tabBarIndicatorStyle: {
    backgroundColor: GREEN
  },
  progressView: {
    backgroundColor: GRAY,
    opacity: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const actionSheetItems = [
  {
    text: 'Contact(optional)',
    value: 'contactItem',
    icon: <Icon name="person" style={{ fontSize: 30, color: PRIMARY_COLOR }} />
  },
  {
    text: 'Activity(optional)',
    value: 'activityItem',
    icon: <Icon name="list" style={{ fontSize: 30, color: PRIMARY_COLOR }} />
  },
  {
    text: 'Note',
    value: 'noteItem',
    icon: <Icon name="description" style={{ fontSize: 30, color: PRIMARY_COLOR }} />
  },
];

class ContactDetailContainer extends PureComponent {

  constructor(props) {
    super(props);

    const { contacts, contactItem } = props;
    const detailData = contacts.details[contactItem.contact_id];
    let contactDeals = { open: [], closed: [], won: [], lost: [] };
    if (detailData) {
      contactDeals = get(detailData, 'deals', {});
    }

    this.state = {
      index: 0,
      routes: [
        { key: 'timeline', title: 'TIMELINE' },
        { key: 'details', title: 'DETAILS' },
        { key: 'deals', title: 'DEALS' },
        { key: 'notes', title: 'NOTES' }
      ],
      timeLineList: testData,
      detailsList: [],
      dealsData: contactDeals.open
        .concat(contactDeals.closed)
        .concat(contactDeals.won)
        .concat(contactDeals.lost),
      notesList: get(detailData, 'notes', []),
      contactList: props.contacts.list,
      contactData: detailData,
      loading: true
    };
  }

  componentWillMount() {
    const { getContactDetail, contactItem, getContactNotes } = this.props;

    this.setState({ loading: true });
    promisify(getContactDetail, { contact_id: contactItem.contact_id })
      .then(() => promisify(getContactNotes, { contact_id: contactItem.contact_id }))
      .catch(() => {})
      .finally(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { contacts, contactItem } = this.props;

    if (contacts !== nextProps.contacts) {
      const detailData = nextProps.contacts.details[contactItem.contact_id];
      const contactDeals = get(detailData, 'deals', {});
      this.setState({
        notesList: get(detailData, 'notes', []),
        contactData: detailData,
        dealsData: contactDeals.open
          .concat(contactDeals.closed)
          .concat(contactDeals.won)
          .concat(contactDeals.lost),
        contactList: nextProps.contacts.list
      });
    }
  }

  itemClicked = (category, itemData) => {
    if (category === 'notes') {
      this.props.routeScene('NotePreviewScene', { note: itemData.description.plain_text }, {
        navigatorStyle: {
          navBarHidden: true,
          tabBarHidden: true,
        }
      });
    }
  }

  onEdit = () => {
    const selectedContact = this.props.contacts.details[this.props.contactItem.contact_id];

    this.props.routeScene('EditContactScene', { selectedContact }, {
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true,
      }
    });
  }

  onAdd = () => {
    this.bottomActionSheet.mainView.show();
  }

  renderScene = (route) => {
    const scenes = {
      timeline:
        <ContactTimeLineTab
          source={route.navigationState.timeLineList}
          itemClicked={this.itemClicked}
        />,
      details:
        <ContactDetailTab
          contactData={route.navigationState.contactData}
          contactId={this.props.contactItem.contact_id}
          callBack={this.props.getContactDetail}
          addContactToGroup={this.props.addContactToGroup}
          user={this.props.user}
          groups={this.props.groups}
          sources={this.props.sources}
        />,
      deals:
        <ContactDealsTab
          source={route.navigationState.dealsData}
          contactId={this.props.contactItem.contact_id}
          contactList={route.navigationState.contactList}
          dealList={this.props.deals}
          itemClicked={this.itemClicked}
          callBack={this.props.getContactDetail}
        />,
      notes:
        <ContactNotesTab
          source={route.navigationState.notesList}
          itemClicked={this.itemClicked}
          contactId={this.props.contactItem.contact_id}
          callBack={this.props.getContactNotes}
        />
    };

    return scenes[route.route.key];
  }

  renderHeader = (props) => {
    return (
      <TabBar
        style={styles.tabBarStyle}
        labelStyle={styles.tabBarLabelStyle}
        indicatorStyle={styles.tabBarIndicatorStyle}
        {...props}
      />
    );
  }

  onActionSheetChange = (value, index, values) => {
    this.setState({ selectedItems: values });
  }

  onActionSheetItemPress = (value) => {
    if (value === 'noteItem') {
      this.props.routeScene('AddNoteScene', { contactData: this.props.contactItem }, {
        navigatorStyle: {
          navBarHidden: true,
          tabBarHidden: true,
        }
      });
    }
  }

  render() {
    const { routeBack, contactItem, contacts } = this.props;
    const { loading } = this.state;

    const detailData = get(contacts.details, contactItem.contact_id, {});
    const firstName = get(detailData, 'first_name', '');
    const lastName = get(detailData, 'last_name', '');
    const fullName = generateFullName(firstName, lastName);

    const primaryEmail = get(detailData, 'contact_data.email_address[0].email', '');
    const title = isEmpty(fullName) ? primaryEmail : fullName;

    const companyTitle = get(detailData, 'title', '');
    const companyName = get(detailData, 'contact_company[0].company_name', '');
    const subTitle = generateFullName(companyTitle, companyName, ', ');

    const phoneNumber = get(detailData, 'contact_data.phone_number[0].number', '');

    return (
      <View style={styles.container}>
        <TopNav
          onBack={routeBack}
          onEdit={this.state.index === 1 ? this.onEdit : null}
          onAdd={this.onAdd}
          userName={title}
          occupation={subTitle}
          phoneNumber={phoneNumber}
        />
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          swipeEnabled={false}
          onIndexChange={(index) => {
            this.setState({ index });
          }}
        />
        <MainActionSheet
          ref={(actionSheet) => { this.bottomActionSheet = actionSheet; }}
          items={actionSheetItems}
          onItemPress={this.onActionSheetItemPress}
          onChange={this.onActionSheetChange}
        />
        {loading &&
        <View style={styles.progressView}>
          <Progress.Circle
            indeterminate={true}
            color={PRIMARY_COLOR}
            size={40}
            thickness={4}
            borderWidth={2}
          />
        </View>}
      </View>
    );
  }
}

ContactDetailContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  contactItem: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getContactDetail: PropTypes.func.isRequired,
  getContactNotes: PropTypes.func.isRequired,
  addContactToGroup: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  sources: PropTypes.array.isRequired,
  deals: PropTypes.array.isRequired,
};

export default compose(
  connectContacts(),
  connectUser(),
  connectCompanies(),
  connectGroups(),
  connectSources(),
  connectDeals()
)(ContactDetailContainer);
