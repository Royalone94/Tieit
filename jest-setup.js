//require('react-native-mock/mock');
import './__mocks__';
// https://github.com/airbnb/enzyme/issues/875
// ignore enzyme test-utils error for now
// See https://github.com/facebook/jest/issues/2208

jest
  .mock('Linking', () => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn().mockImplementation((value: string) => Promise.resolve(value)),
  }))
  .mock('ScrollView', () => {
    const RealComponent = require.requireActual('ScrollView');
    class ScrollView extends RealComponent {
      scrollTo = () => {}
    }
    return ScrollView;
  })
  .mock('LayoutAnimation', () => {
    return {
      Types: {},
      Properties: {},
      easeInEaseOut: () => {},
      configureNext: () => {}
    };
  })
  .mock('NativeEventEmitter', () => {
    class MockEventEmitter {
      addListener() {}
      removeAllListeners() {}
      removeSubscription() {}
    }
    return MockEventEmitter;
  })
  .mock('TextInput', () => {
    const RealComponent = require.requireActual('TextInput');
    const React = require('React');
    class TextInput extends React.Component {
      render() {
        delete this.props.autoFocus;
        return React.createElement('TextInput', this.props, this.props.children);
      }
    }
    TextInput.propTypes = RealComponent.propTypes;
    return TextInput;
  });

const emptyFn = () => {};
const AnimatedValue = function() {
  this.setValue = emptyFn;
  this.setOffset = emptyFn;
};

const AnimatedValueXY = function() {};
AnimatedValueXY.prototype.x = new AnimatedValue();
AnimatedValueXY.prototype.y = new AnimatedValue();
//
// jest.mock('Animated', () => ({
//   Value: AnimatedValue,
//   ValueXY: AnimatedValueXY
// }));
// See https://github.com/facebook/react-native/issues/11659

console.error = jest.genMockFunction();

jest.resetModules();
