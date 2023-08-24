import type Property from '../interfaces/property';
import type State from '../state';
import buyProperty from './buy-property';
import start from './start';

export default function createActions(state: State) {
	return {
		start: () => start(state),
		buyProperty: (property: Property) => buyProperty(state, property)
	};
}