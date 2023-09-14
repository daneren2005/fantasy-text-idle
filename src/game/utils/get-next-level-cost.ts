import properties from '../config/properties';
import skills from '../config/skills';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';
import Resources from '../types/resources';
import SkillTypes from '../types/skill-types';
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
	let skillName: SkillTypes;
	for(skillName in state.skills) {
		let level = state.skills[skillName];
		if(level <= 0) {
			continue;
		}

		let skill = skills[skillName];
		if(skill.perks.propertyCostMultipler) {
			resourceMultipler -= skill.perks.propertyCostMultipler * level;
		}
	}

	let property = properties[propertyName];
	let propertyQuantity = state.properties[propertyName] ?? 0;
	return getNextLevelCost(property.upgradeCosts, propertyQuantity).map(cost => ({
		name: cost.name,
		quantity: Math.floor(cost.quantity * resourceMultipler)
	}));
}

function getNextLevelCostSkill(state: State, skillName: SkillTypes): Resources {
	let skill = skills[skillName];

	return getNextLevelCost({
		'Skill Point': skill.upgradePoints
	}, state.skills[skillName]);
}

export { getNextLevelCostProperty, getNextLevelCostSkill };