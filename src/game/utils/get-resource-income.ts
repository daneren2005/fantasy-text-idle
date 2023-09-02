import properties from '../config/properties';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';
import getGeneratedResource from './get-generated-resource';

export default function getResourceIncome(state: State, name: ResourceTypes) {
	let generate = 0;
	let consume = 0;
	
	let propertyName: PropertyTypes;
	for(propertyName in state.properties) {
		let property = properties[propertyName];
		let propertyQuantity = state.properties[propertyName] ?? 0;

		property.generate.forEach(resource => {
			if(resource.name !== name) {
				return;
			}

			generate += getGeneratedResource(resource.name, resource.quantity * propertyQuantity, state);
		});

		property.consume.forEach(resource => {
			if(resource.name !== name) {
				return;
			}

			consume += resource.quantity * propertyQuantity;
		});
	}

	return {
		income: (generate - consume),
		generate,
		consume
	};
}