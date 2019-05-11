// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { TopNavBar, MainActionSheet } from 'AppComponents';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { DealsList } from 'AppComponents';
import { WHITE, BLACK, GREEN, PRIMARY_COLOR, GRAY } from 'AppColors';
import { connectDeals, connectContacts } from 'AppRedux';
import { promisify } from 'AppUtilities';
import { compose } from 'recompose';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1
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

class DealContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'open', title: 'OPEN' },
        { key: 'won', title: 'WON' },
        { key: 'lost', title: 'LOST' },
        { key: 'closed', title: 'CLOSED' }
      ],
      openList: props.deals.filter((deal) => deal.deal_status === 2),
      wonList: props.deals.filter((deal) => deal.deal_status === 1),
      lostList: props.deals.filter((deal) => deal.deal_status === 3),
      closedList: props.deals.filter((deal) => deal.deal_status === 5),
      contactList: props.contacts.list,
      mounted: false,
      isChecking: false,
      searchText: ''
    };
  }

  componentWillMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (e) => {
    switch (e.id) {
      case 'willAppear':
        if (!this.state.mounted) {
          this.setState({ mounted: true, isChecking: true });
          promisify(this.props.getDeals, null)
            .finally(() => this.setState({ isChecking: false }));
        }
        break;
      default:
        break;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts.list !== this.props.contacts.list ||
      nextProps.deals !== this.props.deals) {
      this.setState({
        openList: nextProps.deals.filter((deal) => deal.deal_status === 2),
        wonList: nextProps.deals.filter((deal) => deal.deal_status === 1),
        lostList: nextProps.deals.filter((deal) => deal.deal_status === 3),
        closedList: nextProps.deals.filter((deal) => deal.deal_status === 5),
        contactList: nextProps.contacts.list
      });
    }
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

  itemClicked = (itemData) => {
    console.log(itemData);
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

  renderScene = (route) => {
    const scenes = {
      open:
        <DealsList
          source={route.navigationState.openList}
          contactList={route.navigationState.contactList}
          dealList={this.props.deals}
          itemClicked={this.itemClicked}
          callBack={this.props.getDeals}
          searchText={route.navigationState.searchText}
        />,
      won:
        <DealsList
          source={route.navigationState.wonList}
          contactList={route.navigationState.contactList}
          dealList={this.props.deals}
          itemClicked={this.itemClicked}
          callBack={this.props.getDeals}
          searchText={route.navigationState.searchText}
        />,
      lost:
        <DealsList
          source={route.navigationState.lostList}
          contactList={route.navigationState.contactList}
          dealList={this.props.deals}
          itemClicked={this.itemClicked}
          callBack={this.props.getDeals}
          searchText={route.navigationState.searchText}
        />,
      closed:
        <DealsList
          source={route.navigationState.closedList}
          contactList={route.navigationState.contactList}
          dealList={this.props.deals}
          itemClicked={this.itemClicked}
          callBack={this.props.getDeals}
          searchText={route.navigationState.searchText}
        />
    };

    return scenes[route.route.key];
  }

  onSearchTextChanged = (text) => {
    this.setState({ searchText: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <TopNavBar
          title={'Deals'}
          sideMenuAction={this.onSideMenuClicked}
          onSearchTextChanged={this.onSearchTextChanged}
          addAction={this.onAddButtonClicked}
          moreAction={this.onMoreButtonClicked}
        />
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          swipeEnabled={false}
          onIndexChange={(index) => this.setState({ index })}
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

DealContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  getDeals: PropTypes.func.isRequired,
  deals: PropTypes.array.isRequired,
  contacts: PropTypes.object.isRequired,
};

export default compose(
  connectDeals(),
  connectContacts()
)(DealContainer);
