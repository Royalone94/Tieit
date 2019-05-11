import { isEmpty } from 'lodash';

export function generateShortName(firstname, lastname) {
  let shortName = '';
  shortName = isEmpty(firstname) ? shortName : `${shortName}${firstname[0].toUpperCase()}`;
  shortName = isEmpty(lastname) ? shortName : `${shortName}${lastname[0].toUpperCase()}`;
  return shortName;
}

export function generateFullName(firstname, lastname, join = ' ') {
  if (!isEmpty(firstname) && !isEmpty(lastname)) {
    return `${firstname}${join}${lastname}`;
  } else if (isEmpty(firstname) && !isEmpty(lastname)) {
    return lastname;
  } else if (!isEmpty(firstname) && isEmpty(lastname)) {
    return firstname;
  }
  return '';
}
