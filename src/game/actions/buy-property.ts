import type Property from '../interfaces/property';
import type State from '../state';

export default function buyProperty(state: State, property: Property) {
	property.quantity++;
}