// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { TopNavBar, CompaniesList, MainActionSheet } from 'AppComponents';
import { connectCompanies, connectContacts } from 'AppRedux';
import { compose } from 'recompose';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class CompanyContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  onSideMenuClicked = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
  }

  onSearchButtonClicked = () => {

  }

  onAddButtonClicked = () => {
    this._mainActionSheet.mainView.show();
  }

  onMoreButtonClicked = () => {

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
          title={'Companies'}
          sideMenuAction={this.onSideMenuClicked}
          onSearchTextChanged={this.onSearchTextChanged}
          addAction={this.onAddButtonClicked}
          moreAction={this.onMoreButtonClicked}
        />
        <CompaniesList
          source={this.props.companies}
          contactList={this.props.contacts.list}
          callBack={this.props.getCompanies}
          searchText={this.state.searchText}
        />
        <MainActionSheet
          ref={(sheet) => { this._mainActionSheet = sheet; }}
          onItemPress={this.onActionSheetItemPress}
        />
      </View>
    );
  }
}

CompanyContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  contacts: PropTypes.object.isRequired
};

export default compose(
  connectContacts(),
  connectCompanies()
)(CompanyContainer);
