import type State from '../state';
import PropertyTypes from '../types/property-types';
import { getNextLevelCostProperty } from '../utils/get-next-level-cost';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

export default function buyProperty(state: State, propertyName: PropertyTypes) {
	let costs = getNextLevelCostProperty(state, propertyName);
	if(!hasResources(state, costs)) {
		return false;
	}

	takeResources(state, costs);
	
	state.properties[propertyName] = (state.properties[propertyName] ?? 0) + 1;
	return true;
}