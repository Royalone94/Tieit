// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native';

import { ContactList, GroupList, SourceList, TopNavBar, MainActionSheet } from 'AppComponents';
import { BLACK, WHITE, GREEN, PRIMARY_COLOR, GRAY } from 'AppColors';
import { connectContacts, connectCompanies, connectGroups, connectSources } from 'AppRedux';
import { promisify } from 'AppUtilities';
import * as Progress from 'react-native-progress';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { compose } from 'recompose';

const styles = StyleSheet.create({
  container: {
    flex: 1
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

class ContactsContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'contacts', title: 'CONTACTS' },
        { key: 'groups', title: 'GROUPS' },
        { key: 'sources', title: 'SOURCES' }
      ],
      isChecking: true,
      searchText: ''
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.loadInitialData();
    }, 2000);
  }

  loadInitialData = () => {
    const { getContactList, getCompanies, getGroups, getSources } = this.props;

    promisify(getContactList, null)
      .then(() => promisify(getCompanies, null))
      .then(() => promisify(getGroups, null))
      .then(() => promisify(getSources, null))
      .catch(() => {})
      .finally(() => this.setState({ isChecking: false }));
  }

  onSideMenuClicked = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
  }

  onAddButtonClicked = () => {
    this._mainActionSheet.mainView.show();
  }

  onMoreButtonClicked = () => {

  }

  itemClicked = (itemData) => {
    this.props.routeScene('ContactDetailScene', { contactItem: itemData }, {
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true
      }
    });
  }

  createNewGroup = () => {

  }

  createNewSource = () => {

  }

  renderScene = (route) => {
    const {
      getContactList,
      getGroups,
      getSources,
      contacts,
      groups,
      sources
    } = this.props;

    const scenes = {
      contacts:
        <ContactList
          source={contacts.list}
          itemClicked={this.itemClicked}
          callBack={getContactList}
          searchText={route.navigationState.searchText}
        />,
      groups:
        <GroupList
          source={groups}
          itemClicked={this.itemClicked}
          callBack={getGroups}
          onCreateNew={this.createNewGroup}
          searchText={route.navigationState.searchText}
        />,
      sources:
        <SourceList
          source={sources}
          itemClicked={this.itemClicked}
          callBack={getSources}
          onCreateNew={this.createNewSource}
          searchText={route.navigationState.searchText}
        />
    };

    return scenes[route.route.key];
  }

  renderHeader = (props) => {
    return (
      <TabBar
        style={{ backgroundColor: WHITE }}
        labelStyle={{ color: BLACK }}
        indicatorStyle={{ backgroundColor: GREEN }}
        {...props}
      />
    );
  }

  onActionSheetItemPress = (value) => {
    const { routeScene } = this.props;

    if (value === 'contactItem') {
      routeScene('AddContactScene', null, {
        navigatorStyle: {
          navBarHidden: true,
          tabBarHidden: true,
        }
      });
    } else if (value === 'activityItem') {
      routeScene('AddActivityScene', null, {
        navigatorStyle: {
          navBarHidden: true,
          tabBarHidden: true,
        }
      });
    }
  }

  onSearchTextChanged = (text) => {
    this.setState({ searchText: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <TopNavBar
          title={'Contacts'}
          sideMenuAction={this.onSideMenuClicked}
          onSearchTextChanged={this.onSearchTextChanged}
          addAction={this.onAddButtonClicked}
          moreAction={this.onMoreButtonClicked}
        />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          swipeEnabled={false}
          onIndexChange={(index) => {
            this.setState({ index });
          }}
        />
        <MainActionSheet
          ref={(sheet) => { this._mainActionSheet = sheet; }}
          onItemPress={this.onActionSheetItemPress}
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
      </View>
    );
  }
}

ContactsContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  getContactList: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  getCompanies: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  getSources: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  getGroups: PropTypes.func.isRequired,
};

export default compose(
  connectContacts(),
  connectCompanies(),
  connectGroups(),
  connectSources()
)(ContactsContainer);
