import State from '@/game/state';
import Action from './action';
import getNextLevelCost, { getNextLevelCostSkill } from '@/game/utils/get-next-level-cost';
import properties from '@/game/config/properties';
import hasResources from '@/game/utils/has-resources';
import nobilities from '@/game/config/nobilities';

export default function canDoAction(state: State, action: Action): boolean {
	if(action.type === 'upgrade-property') {
		let costs = getNextLevelCost(properties[action.name].upgradeCosts, state.properties[action.name]);
		return hasResources(state, costs);
	} else if(action.type === 'upgrade-nobility') {
		let costs = getNextLevelCost(nobilities[state.nobility + 1].upgradeCosts, 0);
		return hasResources(state, costs);
	} else if(action.type === 'upgrade-skill') {
		let costs = getNextLevelCostSkill(state, action.name);
		return hasResources(state, costs);
	} else {
		return false;
	}
}