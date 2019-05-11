import { connect } from 'react-redux';
import { companiesActionCreators } from './actions';

function mapStateToProps({ companies }) {
  return {
    companies
  };
}

const mapDispatchToProps = companiesActionCreators;

export function connectCompanies(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
