import properties from '../config/properties';
import type State from '../state';
import PropertyTypes from '../types/property-types';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

const TICK_TIME = 30;
let lastUpdateTime = 0;
export default function start(state: State) {
	if(!state.running) {
		return;
	}

	state.running = true;
	lastUpdateTime = performance.now();
	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}

function runGame(state: State) {
	if(!state.running) {
		return;
	}
	let now = performance.now();
	let elapsedTime = now - lastUpdateTime;

	state.gametime += elapsedTime;
	let elapsedSeconds = elapsedTime / 1_000;
	let propertyName: PropertyTypes;
	for(propertyName in state.properties) {
		let propertyQuantity = state.properties[propertyName] ?? 0;
		if(propertyQuantity <= 0) {
			continue;
		}

		let property = properties[propertyName];

		// Subtract consumed resources and generate new ones
		let require = property.require.map(resource => ({
			name: resource.name,
			quantity: resource.quantity * propertyQuantity * elapsedSeconds
		}));
		if(!hasResources(state, require)) {
			continue;
		}
		
		takeResources(state, require);
		property.generate.forEach(resource => {
			const addQuantity = (resource.quantity * propertyQuantity) * elapsedSeconds;
			state.resources[resource.name] = (state.resources[resource.name] ?? 0) + addQuantity;
		});
	}
	// TODO: Run a second pass on only properties that failed the first time in case we now have enough resources for it to production
	// This is mostly going to be important on throttled timers where we are updating 1 minute at a time

	lastUpdateTime = now;
	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}