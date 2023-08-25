import type State from '../state';
import PropertyTypes from '../types/property-types';
import getNextLevelCost from '../utils/get-next-level-cost';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

export default function buyProperty(state: State, propertyName: PropertyTypes) {
	let costs = getNextLevelCost(state, propertyName);
	if(!hasResources(state, costs)) {
		return;
	}

	takeResources(state, costs);
	
	state.properties[propertyName] = (state.properties[propertyName] ?? 0) + 1;
}