import { connect } from 'react-redux';
import { sourcesActionCreators } from './actions';

function mapStateToProps({ sources }) {
  return {
    sources
  };
}

const mapDispatchToProps = sourcesActionCreators;

export function connectSources(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
