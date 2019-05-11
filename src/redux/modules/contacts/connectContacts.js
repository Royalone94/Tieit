import { connect } from 'react-redux';
import { contactsActionCreators } from './actions';

function mapStateToProps({ contacts }) {
  return {
    contacts
  };
}

const mapDispatchToProps = contactsActionCreators;

export function connectContacts(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
