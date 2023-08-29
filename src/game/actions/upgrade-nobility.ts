import nobilities from '../config/nobilities';
import type State from '../state';
import getNextLevelCost from '../utils/get-next-level-cost';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

export default function upgradeNobility(state: State) {
	let nextLevel = nobilities[state.nobility + 1];
	if(!nextLevel) {
		return;
	}
	let costs = getNextLevelCost(nextLevel.upgradeCosts, 0);
	if(!hasResources(state, costs)) {
		return;
	}

	takeResources(state, costs);
	
	state.nobility++;
}