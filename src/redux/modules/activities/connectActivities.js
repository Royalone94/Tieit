import { connect } from 'react-redux';
import { activitiesActionCreators } from './actions';

function mapStateToProps({ activities }) {
  return {
    activities
  };
}

const mapDispatchToProps = activitiesActionCreators;

export function connectActivities(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
