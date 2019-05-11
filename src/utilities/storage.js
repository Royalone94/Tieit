import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { toPairs, sortBy, fromPairs, isEqual, size, partialRight, get } from 'lodash';
import URL from 'url-parse';
import RNImage from 'react-native-image-progress';

function getPath(uri) {
  const url = new URL(uri);
  return `${RNFetchBlob.fs.dirs.CacheDir}/atmhero-media-cache${url.pathname}`;
}

function fetchImageUri(uri) {
  return RNFetchBlob.config({
    path: getPath(uri),
  }).fetch('GET', uri);
}

const MAX_NUMBER_IMAGES_CACHED = 500;
const CACHE_JSON_KEY = 'IMAGE_RECEIPTS';
const STORAGE_KEY = 'CACHED_IMAGE_V2';

function formatFile(path) {
  return { uri: Platform.OS === 'android' ? `file://${path}` : path };
}

export class Storage {
  constructor(key = 'ATMHero') {
    this._key = key;
  }

  async setItem(key, value) {
    return AsyncStorage.setItem(`@${this._key}:${key}`, value);
  }

  async getItem(key) {
    return AsyncStorage.getItem(`@${this._key}:${key}`);
  }

  async removeItem(key) {
    return AsyncStorage.removeItem(`@${this._key}:${key}`);
  }

  async setJSON(key, value) {
    return this.setItem(key, JSON.stringify(value));
  }

  async getJSON(key) {
    const value = await this.getItem(key);
    return JSON.parse(value);
  }
}

export class CachedImage extends Component {
  static mediaStorageInterval = setInterval(() => {
    // check if media cache is different every second
    if (!isEqual(CachedImage.mediaCache.blob, CachedImage.mediaCache.lastBlob)) {
      CachedImage.mediaCache.lastBlob = { ...CachedImage.mediaCache.blob };
      CachedImage.storage.setJSON(CACHE_JSON_KEY, CachedImage.mediaCache.blob);
    }
  }, 2000);

  static mediaCache = {};
  static storage = new Storage(STORAGE_KEY);

  static init() {
    return CachedImage.storage.getJSON(CACHE_JSON_KEY).then(blob => {
      CachedImage.mediaCache.blob = blob || {};
      CachedImage.mediaCache.lastBlob = { ...CachedImage.mediaCache.blob };
      CachedImage.mediaCache.verified = {};
    });
  }

  static addOrRetrieveUri(uri, onFail) {
    if (CachedImage.mediaCache.blob[uri]) {
      const { path } = CachedImage.mediaCache.blob[uri];
      if (!CachedImage.mediaCache.verified[uri]) {
        CachedImage.mediaCache.verified[uri] = true;
        RNFetchBlob.fs.exists(path).then(exists => {
          if (!exists) {
            delete CachedImage.mediaCache.verified[uri];
            delete CachedImage.mediaCache.blob[uri];
            return onFail();
          }
        });
      }
      return Promise.resolve(formatFile(CachedImage.mediaCache.blob[uri].path));
    }
    return fetchImageUri(uri).then(result => {
      const path = result.path();

      // resolve the file and cache it
      const when = (new Date()).getTime();
      CachedImage.mediaCache.blob[uri] = { when, path };
      if (size(CachedImage.mediaCache.blob) > MAX_NUMBER_IMAGES_CACHED) {
        const sortedPairs = sortBy(toPairs(CachedImage.mediaCache.blob), item => -item[1].when);
        CachedImage.mediaCache.blob = fromPairs(sortedPairs.slice(0, MAX_NUMBER_IMAGES_CACHED));
      }
      return formatFile(path);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      source: null
    };
    this.mounted = false;
  }

  componentWillMount() {
    this.mounted = true;
    if (
      this.props.source &&
      !this.props.source.uri
    ) {
      return this.setState({ source: this.props.source });
    }
    return CachedImage.addOrRetrieveUri(this.props.source.uri, () => {
      this.setState({ source: this.props.source });
    }).then(cachedSource => {
      this.setState({ source: cachedSource });
    }).catch(() => {
      this.setState({ source: this.props.placeholder });
    });
  }

  componentWillReceiveProps({ source }) {
    if (isEqual(source, this.props.source)) {
      return null;
    }
    if (
      this.mounted &&
      !source ||
      !source.uri ||
      source.uri.indexOf('http') !== 0
    ) {
      return this.setState({ source });
    }
    if (this.mounted) {
      this.setState({ source: null });
    }
    return CachedImage
      .addOrRetrieveUri(source.uri, () => this.mounted && this.setState({ source }))
      .then(cachedSource => this.mounted && this.setState({ source: cachedSource }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const combined = {
      ...this.props,
      ...this.state,
    };
    return (
      <RNImage
        onError={partialRight(console.log, get(this, 'props.source.uri'))}
        {...combined}
      />
    );
  }
}

CachedImage.propTypes = {
  ...RNImage.propTypes,
  placeholder: PropTypes.number
};

CachedImage.defaultProps = {
  placeholder: 0
}
