import nobilities from '../config/nobilities';
import properties from '../config/properties';
import skills from '../config/skills';
import State from '../state';
import PropertyTypes from '../types/property-types';
import SkillTypes from '../types/skill-types';
import getGeneratedResource from '../utils/get-generated-resource';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

export default function runGame(state: State, elapsedTime: number) {
	state.gametime += elapsedTime;
	let elapsedSeconds = elapsedTime / 1_000;
	let propertyName: PropertyTypes;
	let totalProperties = 0;
	// TODO: Divide production evenly by percentage of consumption when consumption > production
	for(propertyName in state.properties) {
		let propertyQuantity = state.properties[propertyName] ?? 0;
		if(propertyQuantity <= 0) {
			continue;
		}
		totalProperties += propertyQuantity;

		let property = properties[propertyName];

		// Subtract consumed resources and generate new ones
		let require = property.consume.map(resource => ({
			name: resource.name,
			quantity: resource.quantity * propertyQuantity * elapsedSeconds
		}));
		if(!hasResources(state, require)) {
			continue;
		}

		takeResources(state, require);
		property.generate.forEach(resource => {
			let addQuantity = getGeneratedResource(resource.name, (resource.quantity * propertyQuantity) * elapsedSeconds, state);
			state.resources[resource.name] = (state.resources[resource.name] ?? 0) + addQuantity;
		});
	}
	// TODO: Run a second pass on only properties that failed the first time in case we now have enough resources for it to production
	// This is mostly going to be important on throttled timers where we are updating 1 minute at a time

	let nobility = nobilities[state.nobility];
	state.resources['Skill Point'] = (state.resources['Skill Point'] ?? 0) + nobility.skillPoints * elapsedSeconds;

	let skillName: SkillTypes;
	for(skillName in state.skills) {
		let skill = skills[skillName];
		if(!skill.perks.taxPerProperty) {
			continue;
		}

		let taxPerProperty = skill.perks.taxPerProperty * state.skills[skillName] * totalProperties * elapsedSeconds;
		state.resources.Gold = (state.resources.Gold ?? 0) + taxPerProperty;
	}
}