// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const CREATE_NEW_CONTACT = 'contacts/CREATE_NEW_CONTACT';
export const GET_CONTACT_LIST = 'contacts/GET_CONTACT_LIST';
export const GET_CONTACT_LIST_SUCCESS = 'contacts/GET_CONTACT_LIST_SUCCESS';
export const GET_CONTACT_DETAIL = 'contacts/GET_CONTACT_DETAIL';
export const GET_CONTACT_DETAIL_SUCCESS = 'contacts/GET_CONTACT_DETAIL_SUCCESS';
export const GET_CONTACT_NOTES = 'contacts/GET_CONTACT_NOTES';
export const GET_CONTACT_NOTES_SUCCESS = 'contacts/GET_CONTACT_NOTES_SUCCESS';
export const CREATE_NEW_CONTACT_NOTES = 'contacts/CREATE_NEW_CONTACT_NOTES';
export const ADD_CONTACT_TO_GROUP = 'contacts/ADD_CONTACT_TO_GROUP';
export const UPDATE_CONTACT = 'contacts/UPDATE_CONTACT';

/**
 * Action Creators
 */
export const contactsActionCreators = {
  createNewContact: createPromiseAction(CREATE_NEW_CONTACT),
  getContactList: createPromiseAction(GET_CONTACT_LIST),
  getContactListSuccess: createAction(GET_CONTACT_LIST_SUCCESS),
  getContactDetail: createPromiseAction(GET_CONTACT_DETAIL),
  getContactDetailSuccess: createAction(GET_CONTACT_DETAIL_SUCCESS),
  getContactNotes: createPromiseAction(GET_CONTACT_NOTES),
  getContactNotesSuccess: createAction(GET_CONTACT_NOTES_SUCCESS),
  createNewNote: createPromiseAction(CREATE_NEW_CONTACT_NOTES),
  addContactToGroup: createPromiseAction(ADD_CONTACT_TO_GROUP),
  updateContact: createPromiseAction(UPDATE_CONTACT),
};
