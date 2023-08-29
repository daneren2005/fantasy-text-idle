import nobilities from '../config/nobilities';
import properties from '../config/properties';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';
import Resources from '../types/resources';
import UpgradeCosts from '../types/upgrade-costs';

export default function getNextLevelCost(upgradeCosts: UpgradeCosts, quantity: number): Resources {
	let costs: Resources = [];

	let resource: ResourceTypes;
	for(resource in upgradeCosts) {
		let upgradeCost = upgradeCosts[resource];
		if(!upgradeCost) {
			continue;
		}
		let cost = Math.floor(upgradeCost.base * Math.pow(upgradeCost.exponent, quantity));
		costs.push({
			name: resource,
			quantity: cost
		});
	}

	return costs;
}

function getNextLevelCostProperty(state: State, propertyName: PropertyTypes): Resources {
	let resourceMultipler = 1;
	if(state.nobility) {
		let nobility = nobilities[state.nobility];
		if(nobility.perks.propertyCostMultipler) {
			resourceMultipler = nobility.perks.propertyCostMultipler;
		}
	}

	let property = properties[propertyName];
	let propertyQuantity = state.properties[propertyName] ?? 0;
	return getNextLevelCost(property.upgradeCosts, propertyQuantity).map(cost => ({
		name: cost.name,
		quantity: Math.floor(cost.quantity * resourceMultipler)
	}));
}

export { getNextLevelCostProperty };