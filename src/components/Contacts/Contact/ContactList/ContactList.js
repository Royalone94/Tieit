// @flow

import React, { PureComponent } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { noop, groupBy, isEmpty } from 'lodash';
import AlphabetListView from 'react-native-alphabetlistview';

import { CustomSectionHeader } from '../../SubComponents';
import ContactListItem from './ContactListItem';
import { promisify } from 'AppUtilities';

class ContactList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
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

  renderRow = (rowData) => {
    return (
      <ContactListItem
        itemData={rowData.item}
        onClick={this.props.itemClicked}
      />
    );
  }

  renderSectionItem = () => {
    return null;
  }

  renderSectionHeader = (item) => {
    return (
      <CustomSectionHeader
        title={item.title}
      />
    );
  }

  render() {
    const { source } = this.props;
    const { refreshing } = this.state;

    const regex = new RegExp(`${this.props.searchText.toLowerCase()}`, 'g');
    // eslint-disable-next-line max-len
    const searchResult = source.filter((item) => regex.test(`${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`));

    const dataSource = groupBy(searchResult, (item) => {
      if (!isEmpty(item.first_name)) {
        return item.first_name[0].toUpperCase();
      }

      if (!isEmpty(item.last_name)) {
        return item.last_name[0].toUpperCase();
      }

      return item.contact_data.email_address.email[0].toUpperCase();
    });

    const sortedBy = Object.keys(dataSource).sort().reduce((result, k) => {
      const newResult = result;
      newResult[k] = dataSource[k];
      return newResult;
    }, {});

    return (
      <AlphabetListView
        data={sortedBy}
        cell={this.renderRow}
        cellHeight={30}
        sectionListItem={this.renderSectionItem}
        sectionHeader={this.renderSectionHeader}
        sectionHeaderHeight={22.5}
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

ContactList.propTypes = {
  source: PropTypes.array,
  itemClicked: PropTypes.func,
  callBack: PropTypes.func,
  searchText: PropTypes.string
};

ContactList.defaultProps = {
  source: [],
  itemClicked: noop,
  callBack: null,
  searchText: ''
};

export default ContactList;
