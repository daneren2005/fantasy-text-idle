import PropertyTypes from '@/game/types/property-types';

type Action = PropertyAction | NobilityAction;

interface PropertyAction {
	type: 'upgrade-property'
	name: PropertyTypes
}
interface NobilityAction {
	type: 'upgrade-nobility'
}

export default Action;