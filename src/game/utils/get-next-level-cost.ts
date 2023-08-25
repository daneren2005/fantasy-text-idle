import properties from '../config/properties';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';

export default function getNextLevelCost(state: State, propertyName: PropertyTypes): Array<{name: ResourceTypes, quantity: number}> {
	let costs: Array<{name: ResourceTypes, quantity: number}> = [];
	let property = properties[propertyName];
	let propertyQuantity = state.properties[propertyName] ?? 0;

	let resource: ResourceTypes;
	for(resource in property.upgradeCosts) {
		let upgradeCost = property.upgradeCosts[resource];
		if(!upgradeCost) {
			continue;
		}
		let cost = Math.floor(upgradeCost.base * Math.pow(upgradeCost.exponent, propertyQuantity));
		costs.push({
			name: resource,
			quantity: cost
		});
	}

	return costs;
}