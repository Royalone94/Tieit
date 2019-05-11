// @flow

import React, { PureComponent } from 'react';
import {
  ListView,
  StyleSheet,
  RefreshControl,
  View
} from 'react-native';

import PropTypes from 'prop-types';
import NotesListItem from './NotesListItem';
import { promisify } from 'AppUtilities';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

class ContactNotesTab extends PureComponent {

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      items: this.dataSource.cloneWithRows(this.props.source),
      refreshing: false,
    };

    this.onRefresh = ::this.onRefresh;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source !== nextProps.source) {
      this.setState({ items: this.dataSource.cloneWithRows(nextProps.source) });
    }
  }

  onRefresh() {
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

  renderRow = (rowData) => {
    return (
      <NotesListItem
        noteData={rowData}
        onClick={this.props.itemClicked}
      />
    );
  }

  render() {
    const { items, refreshing } = this.state;

    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={items}
          renderRow={this.renderRow}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}

ContactNotesTab.propTypes = {
  contactId: PropTypes.number.isRequired,
  source: PropTypes.array.isRequired,
  itemClicked: PropTypes.func.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default ContactNotesTab;
