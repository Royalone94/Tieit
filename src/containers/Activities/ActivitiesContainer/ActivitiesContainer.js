// @flow

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { GRAY, GREEN, LIGHT_GRAY } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { connectActivities, connectContacts } from 'AppRedux';
import { formatDate, promisify, formatStringToISODate } from 'AppUtilities';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Agenda } from 'react-native-calendars';
import { ActivitiesListItem, TopNavBar, MainActionSheet } from 'AppComponents';
import { compose } from 'recompose';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  horizontalView: {
    flexDirection: 'row'
  },
  searchForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  searchIcon: {
    fontSize: 20,
    color: GRAY,
    fontWeight: 'bold'
  },
  calendarIcon: {
    fontSize: 18,
    color: GREEN,
    fontWeight: 'bold',
    marginRight: 10
  },
  filterIcon: {
    fontSize: 18,
    color: GRAY,
    fontWeight: 'bold'
  },
  inputField: {
    width: WINDOW_WIDTH - 100,
    marginLeft: 10
  },
  listItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 3,
    padding: 10,
    marginTop: 10
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

class ActivitiesContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      items: {},
      mounted: false,
      refreshing: false
    };

    this.onFilterChanged = ::this.onFilterChanged;
    this.loadItems = ::this.loadItems;
    this.renderItem = ::this.renderItem;
    this.renderEmptyDate = ::this.renderEmptyDate;
    this.rowHasChanged = ::this.rowHasChanged;
    this.renderSearchBar = ::this.renderSearchBar;
    this.onItemClick = ::this.onItemClick;
  }

  componentWillMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (e) => {
    switch (e.id) {
      case 'willAppear':
        if (!this.state.mounted) {
          this.setState({ mounted: true });
          promisify(this.props.getActivities, null)
            .catch(() => {});
        }
        break;
      default:
        break;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.activities !== nextProps.activities) {
      this.loadItems();
    }
  }

  onFilterChanged(e) {
    this.setState({ searchText: e });
  }

  loadItems() {
    const { activities } = this.props;

    if (_.isEmpty(this.state.items)) {
      const newItems = {};

      for (const itemData of activities) {
        const date = formatStringToISODate(itemData.scheduled_date);
        const strTime = formatDate(date);

        if (_.isEmpty(newItems[strTime])) {
          newItems[strTime] = [];
        }
        newItems[strTime].push(itemData);
      }
      this.setState({ items: newItems });
    }
  }

  onItemClick(itemData) {
    console.log('item clicked', itemData);
  }

  renderItem(item) {
    if (_.isEmpty(item)) {
      return null;
    }

    return (
      <ActivitiesListItem
        itemData={item}
        contactList={this.props.contacts.list}
        onClick={this.onItemClick}
      />
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.id !== r2.id;
  }

  renderSearchBar() {
    return (
      <View style={styles.searchForm}>
        <View style={styles.horizontalView}>
          <Icon name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.inputField}
            placeholder={'SEARCH'}
            placeholderTextColor={GRAY}
            value={this.state.searchText}
            onChangeText={this.onFilterChanged}
            underlineColorAndroid={'transparent'}
            returnKeyType={'search'}
            multiline={false}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
        </View>
        <View style={styles.horizontalView}>
          <FontAwesome name="calendar" style={styles.calendarIcon} />
          {false && <FontAwesome name="filter" style={styles.filterIcon} />}
        </View>
      </View>
    );
  }

  onAddButtonClicked = () => {
    this._mainActionSheet.mainView.show();
  }

  onMoreButtonClicked = () => {

  }

  onSideMenuClicked = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
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

  onRefresh = () => {
    this.setState({ refreshing: true });

    promisify(this.props.getActivities, null)
      .catch(() => {})
      .finally(() => {
        this.setState({ refreshing: false });
      });
  }

  render() {
    const { items, refreshing } = this.state;
    const curDate = formatDate(new Date());

    return (
      <View style={styles.container}>
        <TopNavBar
          title={'Activities'}
          sideMenuAction={this.onSideMenuClicked}
          searchAction={this.onSearchButtonClicked}
          addAction={this.onAddButtonClicked}
        />
        { false && this.renderSearchBar() }
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems}
          selected={curDate}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          theme={{
            selectedDayBackgroundColor: GREEN,
            dotColor: GREEN,
            todayTextColor: GREEN
          }}
        />
        <MainActionSheet
          ref={(sheet) => { this._mainActionSheet = sheet; }}
          onItemPress={this.onActionSheetItemPress}
        />
      </View>
    );
  }
}

ActivitiesContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  getActivities: PropTypes.func.isRequired,
};

export default compose(
  connectActivities(),
  connectContacts()
)(ActivitiesContainer);
