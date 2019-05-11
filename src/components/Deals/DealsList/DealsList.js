// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';

import { promisify } from 'AppUtilities';
import DealsListItem from './DealsListItem';
import { sortBy } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class DealsList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      items: props.source,
      refreshing: false
    };

    this.renderRow = ::this.renderRow;
    this.onRefresh = ::this.onRefresh;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source !== nextProps.source) {
      this.setState({ items: nextProps.source });
    }
  }

  onRefresh() {
    const { callBack, contactId } = this.props;

    if (callBack) {
      this.setState({ refreshing: true });

      let params = null;
      if (contactId) {
        params = { contact_id: contactId };
      }

      promisify(callBack, params)
        .catch(() => {})
        .finally(() => {
          this.setState({ refreshing: false });
        });
    }
  }

  renderRow(itemData) {
    return (
      <DealsListItem
        dealData={itemData.item}
        contactList={this.props.contactList}
        dealList={this.props.dealList}
        onClick={this.props.itemClicked}
        filtered={this.props.filtered}
      />
    );
  }

  keyExtractor = (item) => item.id || item.deal_id;

  sortComparator = (deal) => {
    return -Date.parse(deal.last_updated_time || deal.deal_created_date);
  }

  render() {
    const { items, refreshing } = this.state;
    const regex = new RegExp(`${this.props.searchText.toLowerCase()}`, 'g');
    const sortedDeals = sortBy(items, this.sortComparator);
    const searchResult = sortedDeals.filter((item) => regex.test((item.name || item.deal_name).toLowerCase()));

    return (
      <FlatList
        style={styles.container}
        data={searchResult}
        renderItem={this.renderRow}
        enableEmptySections={true}
        keyExtractor={this.keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    );
  }
}

DealsList.propTypes = {
  source: PropTypes.array.isRequired,
  dealList: PropTypes.array.isRequired,
  contactList: PropTypes.array.isRequired,
  contactId: PropTypes.number,
  itemClicked: PropTypes.func.isRequired,
  callBack: PropTypes.func.isRequired,
  filtered: PropTypes.bool,
  searchText: PropTypes.string
};

DealsList.defaultProps = {
  filtered: true,
  searchText: ''
};

export default DealsList;
