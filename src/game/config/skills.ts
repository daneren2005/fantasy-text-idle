import Skill from '@/game/interfaces/skill';
import SkillTypes from '../types/skill-types';

const skills: {[K in SkillTypes]:Skill} = {
	'Green Thumb': {
		upgradePoints: {
			base: 10,
			exponent: 1.5
		}
	},
	'Negotiator': {
		requireNobility: 'Land Owner',
		upgradePoints: {
			base: 10,
			exponent: 1.5
		}
	},
	'Lender': {
		requireNobility: 'Merchant',
		upgradePoints: {
			base: 10,
			exponent: 1.5
		}
	}
};
export default skills;