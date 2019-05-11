// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isEmpty } from 'lodash';
import { LIGHT_GRAY } from 'AppColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    overflow: 'hidden'
  },
  titleContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GRAY,
  },
  title: {
    flex: 1,
    color: '#2a2f43',
    fontWeight: '500'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 0,
    paddingTop: 0
  },
  icon: {
    fontSize: 20,
    color: '#00f'
  },
  additionalView: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  additionalIcon: {
    color: '#37bd92',
    fontSize: 16,
    marginRight: 5
  },
  additionalTitle: {
    color: '#37bd92',
    fontSize: 14
  }
});

class ExtendableView extends PureComponent {
  constructor(props) {
    super(props);

    this.icons = {
      up: <Icon name="keyboard-arrow-up" style={styles.icon} />,
      down: <Icon name="keyboard-arrow-down" style={styles.icon} />
    };

    this.state = {
      expanded: false,
      animation: new Animated.Value(),
    };
  }

  toggle = () => {
    const initialValue =
      this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue =
      this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    }, () => {
      this.props.onStatusChanged(this.state.expanded);
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight = (event) => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight = (event) => {
    this.setState({
      minHeight: event.nativeEvent.layout.height + 5
    });
  }

  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    return (
      <Animated.View
        style={styles.container}
      >
        <TouchableOpacity onPress={this.toggle} disabled={this.props.disabled}>
          <View
            style={styles.titleContainer}
            onLayout={this._setMinHeight}
          >
              <Text style={styles.title}>{this.props.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              {!isEmpty(this.props.additionalTitle) &&
                <TouchableOpacity
                  style={styles.additionalView}
                  onPress={this.props.onOptionalClicked}
                >
                  <Icon name="add-circle" style={styles.additionalIcon} />
                  <Text style={styles.additionalTitle}>{this.props.additionalTitle}</Text>
                </TouchableOpacity>
              }
              {!this.props.disabled &&
              <View style={styles.button}>
                {icon}
              </View>}
            </View>
          </View>
          {this.state.expanded &&
          <View style={styles.body} onLayout={this._setMaxHeight}>
            {this.props.children}
          </View>}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

ExtendableView.propTypes = {
  title: PropTypes.string,
  additionalTitle: PropTypes.string,
  disabled: PropTypes.bool,
  onStatusChanged: PropTypes.func,
  onOptionalClicked: PropTypes.func
};

ExtendableView.defaultProps = {
  title: '',
  additionalTitle: '',
  disabled: false,
  onStatusChanged: () => {},
  onOptionalClicked: () => {}
};

export default ExtendableView;
