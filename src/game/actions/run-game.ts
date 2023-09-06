import nobilities from '../config/nobilities';
import properties from '../config/properties';
import State from '../state';
import PropertyTypes from '../types/property-types';
import getGeneratedResource from '../utils/get-generated-resource';
import hasResources from '../utils/has-resources';
import takeResources from '../utils/take-resources';

export default function runGame(state: State, elapsedTime: number) {
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

		takeResources(state, require);
		property.generate.forEach(resource => {
			let addQuantity = getGeneratedResource(resource.name, (resource.quantity * propertyQuantity) * elapsedSeconds, state);
			state.resources[resource.name] = (state.resources[resource.name] ?? 0) + addQuantity;
		});
	}
	// TODO: Run a second pass on only properties that failed the first time in case we now have enough resources for it to production
	// This is mostly going to be important on throttled timers where we are updating 1 minute at a time

	let nobility = nobilities[state.nobility];
	state.skill += nobility.skillPoints * elapsedSeconds;
}