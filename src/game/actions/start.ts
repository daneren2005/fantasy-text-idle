import nobilities from '../config/nobilities';
import properties from '../config/properties';
import type State from '../state';
import PropertyTypes from '../types/property-types';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';
import autoSave from './auto-save';

const TICK_TIME = 30;
const AUTO_SAVE_TIME = 1_000;
let lastUpdateTime = 0;
let lastSavedTime = 0;
export default function start(state: State) {
	state.running = true;
	lastUpdateTime = lastSavedTime = performance.now();
	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}

async function runGame(state: State) {
	if(!state.running) {
		return;
	}
	let now = performance.now();
	let elapsedTime = now - lastUpdateTime;

	state.gametime += elapsedTime;
	let elapsedSeconds = elapsedTime / 1_000;
	let propertyName: PropertyTypes;
	// TODO: Divide production evenly by percentage of consumption when consumption > production
	for(propertyName in state.properties) {
		let propertyQuantity = state.properties[propertyName] ?? 0;
		if(propertyQuantity <= 0) {
			continue;
		}

		let property = properties[propertyName];

		// Subtract consumed resources and generate new ones
		let require = property.consume.map(resource => ({
			name: resource.name,
			quantity: resource.quantity * propertyQuantity * elapsedSeconds
		}));
		if(!hasResources(state, require)) {
			continue;
		}

		let nobility = nobilities[state.nobility];
		takeResources(state, require);
		property.generate.forEach(resource => {
			let addQuantity = (resource.quantity * propertyQuantity) * elapsedSeconds;
			let nobilityBonusMultipler = nobility.perks.resourceMultipler?.[resource.name];
			if(nobilityBonusMultipler) {
				addQuantity = addQuantity * nobilityBonusMultipler;
			}
			state.resources[resource.name] = (state.resources[resource.name] ?? 0) + addQuantity;
		});
	}
	// TODO: Run a second pass on only properties that failed the first time in case we now have enough resources for it to production
	// This is mostly going to be important on throttled timers where we are updating 1 minute at a time

	if((lastSavedTime + AUTO_SAVE_TIME) < now) {
		await autoSave(state);
		lastSavedTime = now;
	}

	lastUpdateTime = now;
	window.setTimeout(() => {
		runGame(state);
	}, TICK_TIME);
}