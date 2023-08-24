import type State from '../state';
import type ResourceTypes from '../types/resource-types';

const TICK_TIME = 30;
export default function start(state: State) {
	if(!state.running) {
		return;
	}

	state.running = true;
	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}

function runGame(state: State) {
	if(!state.running) {
		return;
	}

	// TODO: Replace with some real time tracking instead of assuming setTimeout is accurate
	state.gametime += TICK_TIME;
	Object.values(state.properties).forEach(property => {
		if(property.quantity <= 0) {
			return;
		}

		const missingRequiredResources = !!(Object.keys(property.require) as Array<ResourceTypes>).find(resource => {
			const requiredQuantity = ((property.require[resource] ?? 0) * property.quantity) / TICK_TIME;
			return state.resources[resource] <= requiredQuantity;
		});
		if(missingRequiredResources) {
			return;
		}

		// Subtract consumed resources and generate new ones
		(Object.keys(property.require) as Array<ResourceTypes>).forEach(resource => {
			const addQuantity = ((property.require[resource] ?? 0) * property.quantity) / TICK_TIME;
			state.resources[resource] -= addQuantity;
		});
		(Object.keys(property.generate) as Array<ResourceTypes>).forEach(resource => {
			const addQuantity = ((property.generate[resource] ?? 0) * property.quantity) / TICK_TIME;

			if(!state.resources[resource]) {
				state.resources[resource] = 0;
			}
			state.resources[resource] += addQuantity;
		});
	});

	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}