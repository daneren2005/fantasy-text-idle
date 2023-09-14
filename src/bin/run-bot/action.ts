import PropertyTypes from '@/game/types/property-types';
import SkillTypes from '@/game/types/skill-types';

type Action = PropertyAction | NobilityAction | SkillAction;

interface PropertyAction {
	type: 'upgrade-property'
	name: PropertyTypes
}
interface NobilityAction {
	type: 'upgrade-nobility'
}
interface SkillAction {
	type: 'upgrade-skill'
	name: SkillTypes
}

export default Action;