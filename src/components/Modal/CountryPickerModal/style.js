// @flow

import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'AppConstants';

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 400;

export default StyleSheet.create({

  overlayStyle: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: WINDOW_WIDTH * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.8)',
    left: WINDOW_WIDTH * 0.1,
    top: (WINDOW_HEIGHT - OPTION_CONTAINER_HEIGHT) / 2
  },

  cancelContainer: {
    left: WINDOW_WIDTH * 0.1,
    top: (WINDOW_HEIGHT - OPTION_CONTAINER_HEIGHT) / 2 + 10
  },

  selectStyle: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: BORDER_RADIUS
  },

  selectTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE
  },

  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    width: WINDOW_WIDTH * 0.8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: PADDING
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE
  },

  optionStyle: {
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  optionTextStyle: {
    fontSize: FONT_SIZE,
    color: HIGHLIGHT_COLOR
  },

  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE
  }
});
