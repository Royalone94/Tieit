import { connect } from 'react-redux';
import { dealsActionCreators } from './actions';

function mapStateToProps({ deals }) {
  return {
    deals
  };
}

const mapDispatchToProps = dealsActionCreators;

export function connectDeals(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
