import skills from '../config/skills';
import State from '../state';
import SkillTypes from '../types/skill-types';

export default function upgradeSkill(state: State, skillName: SkillTypes) {
	let skill = skills[skillName];
	let level = state.skills[skillName];
	let upgradeCost = Math.floor(skill.upgradePoints.base * Math.pow(skill.upgradePoints.exponent, level));
	if(state.skill < upgradeCost) {
		return;
	}

	state.skill -= upgradeCost;
	state.skills[skillName]++;
}