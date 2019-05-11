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
import { formatDate } from 'AppUtilities';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Agenda } from 'react-native-calendars';
import TimeLineListItem from './TimeLineListItem';

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

class ContactTimeLineTab extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      items: {}
    };

    this.onFilterChanged = ::this.onFilterChanged;
    this.loadItems = ::this.loadItems;
    this.renderItem = ::this.renderItem;
    this.renderEmptyDate = ::this.renderEmptyDate;
    this.rowHasChanged = ::this.rowHasChanged;
    this.renderSearchBar = ::this.renderSearchBar;
    this.onItemClick = ::this.onItemClick;
  }

  onFilterChanged(e) {
    this.setState({ searchText: e });
  }

  loadItems() {
    const { source } = this.props;

    if (_.isEmpty(this.state.items)) {
      const newItems = {};

      for (const itemData of source) {
        const date = new Date(itemData.first_touch * 1000);
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
      <TimeLineListItem
        itemData={item}
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
    return r1.contact_id !== r2.contact_id;
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

  render() {
    const { items } = this.state;
    const curDate = formatDate(new Date());

    return (
      <View style={styles.container}>
        { this.renderSearchBar() }
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
      </View>
    );
  }
}

ContactTimeLineTab.propTypes = {
  source: PropTypes.array.isRequired,
  itemClicked: PropTypes.func.isRequired,
};

export default ContactTimeLineTab;
