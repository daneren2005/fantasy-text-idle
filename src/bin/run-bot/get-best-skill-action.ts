import skills from '@/game/config/skills';
import State from '@/game/state';
import SkillTypes from '@/game/types/skill-types';
import Action from './action';
import hasNobility from '@/game/utils/has-nobility';
import { getNextLevelCostSkill } from '@/game/utils/get-next-level-cost';

let skillNames = Object.keys(skills) as Array<SkillTypes>;
export default function getBestSkillAction(state: State): Action {
	let availableSkills = skillNames.filter(skillName => {
		let skill = skills[skillName];
		return hasNobility(skill.requireNobility, state);
	});
	let skillsWithCost = availableSkills.map(skillName => {
		return {
			skillName,
			cost: getNextLevelCostSkill(state, skillName)[0].quantity
		};
	});
	skillsWithCost.sort((a, b) => a.cost - b.cost);

	return {
		type: 'upgrade-skill',
		name: skillsWithCost[0].skillName
	};
}