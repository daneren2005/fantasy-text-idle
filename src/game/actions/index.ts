import type State from '../state';
import PropertyTypes from '../types/property-types';
import buyProperty from './buy-property';
import start from './start';
import stop from './stop';

export default function createActions(state: State) {
	return {
		start: () => start(state),
		stop: () => stop(state),
		buyProperty: (propertyName: PropertyTypes) => buyProperty(state, propertyName)
	};
}