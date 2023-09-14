import State from '@/game/state';
import Action from './action';
import getNextLevelCost from '@/game/utils/get-next-level-cost';
import properties from '@/game/config/properties';
import Resources from '@/game/types/resources';
import ResourceTypes from '@/game/types/resource-types';
import getResourceIncome from '@/game/utils/get-resource-income';
import nobilities from '@/game/config/nobilities';
import chalk from 'chalk';

export default function serialize(state: State, action: Action | 'production'): string {
	if(action === 'production') {
		let resources = Object.keys(state.resources) as Array<ResourceTypes>;
		return 'Production: ' + resources.map(r => {
			let income = getResourceIncome(state, r);
			return `${r}: ${income.income >= 0 ? '+' : ''}${income.income} (${state.resources[r]})`;
		}).join(', ');
	} else if(action.type === 'upgrade-property') {
		let costs = getNextLevelCost(properties[action.name].upgradeCosts, state.properties[action.name]);
		return chalk.green(`Upgrade ${action.name} to level ${state.properties[action.name] + 1} for ${serializeResources(costs)}`);
	} else if(action.type === 'upgrade-nobility') {
		let costs = getNextLevelCost(nobilities[state.nobility + 1].upgradeCosts, 0);
		return chalk.blue(`Upgrade Nobility to ${nobilities[state.nobility + 1].name} for ${serializeResources(costs)}`);
	} else {
		return '';
	}
}

function serializeResources(resources: Resources) {
	return resources.map(resource => `${resource.quantity} ${resource.name}`).join(', ');
}