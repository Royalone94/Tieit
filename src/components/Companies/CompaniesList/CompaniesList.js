// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';

import { promisify } from 'AppUtilities';
import CompaniesListItem from './CompaniesListItem';
import { noop } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class CompaniesList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      items: props.source,
      refreshing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source !== nextProps.source) {
      this.setState({ items: nextProps.source });
    }
  }

  onRefresh = () => {
    const { callBack } = this.props;

    if (callBack) {
      this.setState({ refreshing: true });

      promisify(callBack, null)
        .catch(() => {})
        .finally(() => {
          this.setState({ refreshing: false });
        });
    }
  }

  renderRow = (itemData) => {
    return (
      <CompaniesListItem
        companyData={itemData.item}
        contactList={this.props.contactList}
        onClick={this.props.itemClicked}
      />
    );
  }

  keyExtractor = (item) => item.id;

  render() {
    const { items, refreshing } = this.state;
    const regex = new RegExp(`${this.props.searchText.toLowerCase()}`, 'g');
    const searchResult = items.filter((item) => regex.test(item.name.toLowerCase()));

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

CompaniesList.propTypes = {
  source: PropTypes.array,
  contactList: PropTypes.array,
  itemClicked: PropTypes.func,
  callBack: PropTypes.func,
  searchText: PropTypes.string
};

CompaniesList.defaultProps = {
  source: [],
  contactList: [],
  itemClicked: noop,
  callBack: noop,
  searchText: ''
};

export default CompaniesList;
