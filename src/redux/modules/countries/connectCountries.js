import { connect } from 'react-redux';
import { countriesActionCreators } from './actions';

function mapStateToProps({ countries }) {
  return {
    countries
  };
}

const mapDispatchToProps = countriesActionCreators;

export function connectCountries(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
