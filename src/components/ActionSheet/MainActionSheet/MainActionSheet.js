// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
} from 'react-native';

import { PRIMARY_COLOR } from 'AppColors';
import { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
import { noop, isEmpty } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color: PRIMARY_COLOR
  },
  text: {
    color: PRIMARY_COLOR
  }
});

const sheetItems = [
  {
    text: 'Contact',
    value: 'contactItem',
    icon: <Icon name="person" style={{ fontSize: 30, color: PRIMARY_COLOR }} />
  },
  {
    text: 'Activity',
    value: 'activityItem',
    icon: <Icon name="list" style={{ fontSize: 30, color: PRIMARY_COLOR }} />
  }
];

class MainActionSheet extends PureComponent {

  render() {
    const {
      items,
      onChange,
      onItemPress,
    } = this.props;

    const actionSheetItems = isEmpty(items) ? sheetItems : items;

    return (
      <ActionSheet
        ref={(actionSheet) => { this.mainView = actionSheet; }}
        position="bottom"
        onChange={onChange}
        hideOnHardwareBackPress={true}
        animationDuration={300}
      >
        {actionSheetItems.map((item) => (
            <ActionSheetItem
              key={item.value}
              text={item.text}
              value={item.value}
              onPress={onItemPress}
              textStyle={styles.text}
              icon={item.icon}
            />
          )
        )}
      </ActionSheet>
    );
  }
}

MainActionSheet.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  onItemPress: PropTypes.func,
};

MainActionSheet.defaultProps = {
  items: [],
  onChange: noop,
  onItemPress: noop
};

export default MainActionSheet;
