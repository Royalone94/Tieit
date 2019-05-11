// @flow

import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'AppConstants';
import { GRAY } from 'AppColors';

export default StyleSheet.create({
  overlayStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  optionContainer: {
    width: WINDOW_WIDTH * 0.9,
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  itemView: {
    flexDirection: 'row',
    marginTop: 30
  },
  itemIcon: {
    fontSize: 28,
    color: GRAY
  },
  itemLabel: {
    fontSize: 20,
    color: GRAY,
    marginLeft: 15
  }
});
