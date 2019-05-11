// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { PRIMARY_COLOR, WHITE, LOGIN_BACK_GRADIENT, LIGHT_GRAY } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { dismissKeyboard, promisify, AlertMessage } from 'AppUtilities';
import { HelveticaBold } from 'AppFonts';
import { startApp } from 'AppNavigator';
import { connectUser } from 'AppRedux';

import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 30,
  },
  logoImage: {
    width: WINDOW_WIDTH * 0.4,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50
  },
  inputField: {
    borderBottomWidth: 0.5,
    borderBottomColor: WHITE,
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: WHITE,
    height: 50,
    textAlign: 'left',
    marginBottom: 20
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: WHITE,
    width: WINDOW_WIDTH * 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    height: 50
  },
  buttonText: {
    fontSize: 20,
    color: WHITE
  },
  progressView: {
    backgroundColor: LIGHT_GRAY,
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

class LoginContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isChecking: false
    };

    this.onEmailChanged = ::this.onEmailChanged;
    this.onPasswordChanged = ::this.onPasswordChanged;
    this.onSubmit = ::this.onSubmit;
  }

  componentWillMount() {
    AsyncStorage.getItem('@TIEIT:EMAIL')
      .then((email) => this.setState({ email }));
  }

  onEmailChanged(e) {
    this.setState({ email: e });
  }

  onPasswordChanged(e) {
    this.setState({ password: e });
  }

  onSubmit() {
    const { login, getUserInfo, getOAuthToken } = this.props;
    const { email, password } = this.state;

    dismissKeyboard();

    if (isEmpty(email) || !validator.isEmail(email)) {
      AlertMessage.showMessage(null, 'Please input valid email address');
      return;
    }

    if (isEmpty(password)) {
      AlertMessage.showMessage(null, 'Please input valid password');
      return;
    }

    this.setState({ isChecking: true });

    const oAuthToken = true;

    if (!oAuthToken) {
      promisify(login, { email, password })
        .then((token) => {
          AsyncStorage.setItem('@TIEIT:TOKEN', token);
          AsyncStorage.setItem('@TIEIT:TOKEN_TYPE', 'Bearer');
          AsyncStorage.setItem('@TIEIT:EMAIL', email);
          return promisify(getUserInfo, null);
        })
        .then(() => startApp())
        .catch((err) => AlertMessage.showMessage(null, err))
        .finally(() => this.setState({ isChecking: false }));
    } else {
      const client_id = 3;
      const grant_type = 'password';
      const client_secret = 'TsMpMeaEDPtJsEswNv17GTb8fNJb63a32xNov4bB';
      promisify(getOAuthToken, { username: email, password, client_id, grant_type, client_secret })
        .then((res) => {
          AsyncStorage.setItem('@TIEIT:TOKEN', res.access_token);
          AsyncStorage.setItem('@TIEIT:REFRESH_TOKEN', res.refresh_token);
          AsyncStorage.setItem('@TIEIT:TOKEN_TYPE', res.token_type);
          AsyncStorage.setItem('@TIEIT:EMAIL', email);
          return promisify(getUserInfo, null);
        })
        .then(() => startApp())
        .catch((err) => AlertMessage.showMessage(null, err))
        .finally(() => this.setState({ isChecking: false }));
    }
  }

  render() {
    const { email, password, isChecking } = this.state;

    return (
      <LinearGradient
        colors={LOGIN_BACK_GRADIENT}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAwareScrollView
          ref={ref => this._contentView = ref}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View>
              <Image
                source={require('img/images/w_logo.png')}
                style={styles.logoImage}
              />
              <TextInput
                ref={ref => this._email = ref}
                style={styles.inputField}
                placeholder={'Email Address'}
                placeholderTextColor={WHITE}
                value={email}
                keyboardType={'email-address'}
                onChangeText={this.onEmailChanged}
                underlineColorAndroid={'transparent'}
                returnKeyType={'next'}
                multiline={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                onSubmitEditing={() => {
                  this._password.focus();
                }}
              />
              <TextInput
                ref={ref => this._password = ref}
                style={styles.inputField}
                placeholder={'Password'}
                placeholderTextColor={WHITE}
                value={password}
                onChangeText={this.onPasswordChanged}
                underlineColorAndroid={'transparent'}
                returnKeyType={'done'}
                multiline={false}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={true}
                onSubmitEditing={this.onSubmit}
              />
              <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                <HelveticaBold style={styles.buttonText}>SUBMIT</HelveticaBold>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        {isChecking &&
        <View style={styles.progressView}>
          <Progress.Circle
            indeterminate={true}
            color={WHITE}
            size={40}
            thickness={4}
            borderWidth={2}
          />
        </View>
        }
      </LinearGradient>
    );
  }
}

LoginContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  getOAuthToken: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

export default connectUser()(LoginContainer);
