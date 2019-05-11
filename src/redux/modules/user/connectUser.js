import { connect } from 'react-redux';
import { userActionCreators } from './actions';

function mapStateToProps({ user }) {
  return {
    user
  };
}

const mapDispatchToProps = userActionCreators;

export function connectUser(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
