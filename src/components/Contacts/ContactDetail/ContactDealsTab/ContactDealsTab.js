// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DealsList } from 'AppComponents';

class ContactDealsTab extends PureComponent {

  render() {
    const { source, contactList, itemClicked, callBack, contactId } = this.props;
    const dataSource = source.filter((deal) => deal.status !== 4);

    return (
      <DealsList
        source={dataSource}
        contactList={contactList}
        dealList={this.props.dealList}
        itemClicked={itemClicked}
        contactId={contactId}
        callBack={callBack}
        filtered={false}
      />
    );
  }
}

ContactDealsTab.propTypes = {
  source: PropTypes.array.isRequired,
  contactList: PropTypes.array.isRequired,
  dealList: PropTypes.array.isRequired,
  contactId: PropTypes.number.isRequired,
  itemClicked: PropTypes.func.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default ContactDealsTab;
