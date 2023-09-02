import Skill from '@/game/interfaces/skill';
import SkillTypes from '../types/skill-types';

const skills: {[K in SkillTypes]:Skill} = {
	'Green Thumb': {
		perks: {
			resourceMultipler: {
				Food: 0.05
			}
		},
		upgradePoints: {
			base: 10,
			exponent: 1.5
		}
	},
	'Negotiator': {
		perks: {
			propertyCostMultipler: 0.01
		},
		requireNobility: 'Land Owner',
		upgradePoints: {
			base: 10,
			exponent: 2
		}
	},
	'Lender': {
		perks: {
			resourceMultipler: {
				Gold: 0.05
			}
		},
		requireNobility: 'Merchant',
		upgradePoints: {
			base: 10,
			exponent: 1.5
		}
	}
};
export default skills;