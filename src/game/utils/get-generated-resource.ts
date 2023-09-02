import skills from '../config/skills';
import State from '../state';
import ResourceTypes from '../types/resource-types';
import SkillTypes from '../types/skill-types';

export default function getGeneratedResource(resourceName: ResourceTypes, quantity: number, state: State) {
	let multiplier = 1;

	let skillName: SkillTypes;
	for(skillName in state.skills) {
		let level = state.skills[skillName];
		if(level <= 0) {
			continue;
		}

		let skill = skills[skillName];
		let baseMultiplier = skill.perks.resourceMultipler?.[resourceName];
		if(baseMultiplier) {
			multiplier += baseMultiplier * level;
		}
	}

	return quantity * multiplier;
}