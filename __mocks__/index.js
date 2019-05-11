jest
  .mock('react-native-navigation', () => require.requireActual('./react-native-navigation'))
  .mock('react-native-fetch-blob', () => require.requireActual('./react-native-fetch-blob'))
