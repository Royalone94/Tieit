import { connect } from 'react-redux';
import { groupsActionCreators } from './actions';

function mapStateToProps({ groups }) {
  return {
    groups
  };
}

const mapDispatchToProps = groupsActionCreators;

export function connectGroups(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
