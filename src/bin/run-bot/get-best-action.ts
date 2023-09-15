import State from '@/game/state';
import Action from './action';
import getResourceIncome from '@/game/utils/get-resource-income';
import ResourceTypes from '@/game/types/resource-types';
import properties from '@/game/config/properties';
import PropertyTypes from '@/game/types/property-types';
import hasNobility from '@/game/utils/has-nobility';
import nobilities from '@/game/config/nobilities';
import getNextLevelCost, { getNextLevelCostProperty } from '@/game/utils/get-next-level-cost';

const propertyNames = Object.keys(properties) as Array<PropertyTypes>;
export default function getBestAction(state: State): Action {
	let buildingAction = getBestBuildingAction(state);

	// Upgrade nobility if less than twice the cost of the next building upgrade
	if(buildingAction.type === 'upgrade-property') {
		let buildingCost = getNextLevelCost(properties[buildingAction.name].upgradeCosts, state.properties[buildingAction.name]);
		let buildingGold = buildingCost.find(r => r.name === 'Gold')?.quantity ?? 0;

		let nextNobility = nobilities[state.nobility + 1];
		if(nextNobility) {
			let nobilityCost = getNextLevelCost(nextNobility.upgradeCosts, 0);
			let nobilityGold = nobilityCost.find(r => r.name === 'Gold')?.quantity ?? 0;

			if(buildingGold * 2 >= nobilityGold) {
				return {
					type: 'upgrade-nobility'
				};
			}
		}
	}


	return buildingAction;
}

function getBestBuildingAction(state: State): Action {
	let negativeResourceAction = getActionForNegativeIncome(state);
	if(negativeResourceAction) {
		return negativeResourceAction;
	}
	
	// TODO: Make this work intelligently - just a way to get some wood production started to upgrade Food Stalls
	let woodProperty = getPropertiesWithResource(state, 'Wood')[0];
	if(woodProperty && state.properties[woodProperty] <= 0) {
		return getUpgradeBuildingAction(state, woodProperty);
	}

	// Find next cheapest gold producing facility
	let goldProperties = getPropertiesWithResource(state, 'Gold');
	if(goldProperties.length) {
		return getUpgradeBuildingAction(state, goldProperties[0]);
	}

	throw new Error('WARNING: Should never be reached');
}

function getPropertiesWithResource(state: State, resource: ResourceTypes): Array<PropertyTypes> {
	return propertyNames.filter(propName => {
		let prop = properties[propName];
		return hasNobility(prop.requireNobility, state) && prop.generate.map(g => g.name).includes(resource);
	});
}

function getUpgradeBuildingAction(state: State, propertyName: PropertyTypes): Action {
	let clone = state.clone();
	clone.properties[propertyName]++;

	// See if this upgrade puts us in the negative anywhere - fix it first if it does
	let negativeResourceAction = getActionForNegativeIncome(clone);
	if(negativeResourceAction) {
		return negativeResourceAction;
	}

	// Try to make sure that we don't end up just waiting for wood to build up from single lumbermill
	let costs = getNextLevelCostProperty(state, propertyName);
	let nonGoldCosts = costs.filter(cost => cost.name !== 'Gold').map(cost => {
		let income = getResourceIncome(state, cost.name).income;
		let time = (cost.quantity - (state.resources[cost.name] ?? 0)) / income;

		return {
			name: cost.name,
			quantity: cost.quantity,
			income,
			time
		};
	}).filter(c => c.time > 0);
	if(nonGoldCosts.length) {
		const goldCost = costs.find(cost => cost.name === 'Gold') as { name: ResourceTypes, quantity: number };
		const goldIncome = getResourceIncome(state, 'Gold').income;
		const goldTime = goldCost.quantity / goldIncome;

		for(let i = 0; i < nonGoldCosts.length; i++) {
			let nonGoldCost = nonGoldCosts[0];
			if(nonGoldCost.time > (goldTime * 2)) {
				let propertyOptions = getPropertiesWithResource(state, nonGoldCost.name);
				if(propertyOptions.length) {
					return getUpgradeBuildingAction(state, propertyOptions[0]);
				}
			}
		}
	}

	return {
		type: 'upgrade-property',
		name: propertyName
	};
}

function getActionForNegativeIncome(state: State): Action | null {
	let resourceWithNegativeIncome = getResourceWithNegativeIncome(state);

	// Make sure to correct deficiencies first
	if(resourceWithNegativeIncome) {
		let propertyWithResource = getPropertiesWithResource(state, resourceWithNegativeIncome)[0];

		if(propertyWithResource) {
			return getUpgradeBuildingAction(state, propertyWithResource);
		}
	}

	return null;
}
function getResourceWithNegativeIncome(state: State) {
	return (Object.keys(state.resources) as Array<ResourceTypes>).find(resourceName => {
		let income = getResourceIncome(state, resourceName);
		return income.income < 0;
	});
}