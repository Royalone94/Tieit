// @flow

import { shallowEqual } from './shallow-equal';

type State = Object;
type Props = Object;
type Instance = {
  state: State,
  props: Props
};

/**
 * shallowCompare to determine should component update or not
 * @param {Object} instance - Component
 * @param {Object} props - new props
 * @param {Object} state - new state
 * @returns {boolean}
 */
export default function shallowCompare(instance: Instance, props: Props, state: State): boolean {
  return !shallowEqual(instance.props, props) || !shallowEqual(instance.state, state);
}
