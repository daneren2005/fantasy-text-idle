import properties from '../config/properties';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';

export default function getResourceIncome(state: State, name: ResourceTypes) {
	let income = 0;
	
	let propertyName: PropertyTypes;
	for(propertyName in state.properties) {
		let property = properties[propertyName];
		let propertyQuantity = state.properties[propertyName] ?? 0;

		property.generate.forEach(resource => {
			if(resource.name !== name) {
				return;
			}

			income += resource.quantity * propertyQuantity;
		});

		property.require.forEach(resource => {
			if(resource.name !== name) {
				return;
			}

			income -= resource.quantity * propertyQuantity;
		});
	}

	return income;
}