import properties from '../config/properties';
import skills from '../config/skills';
import State from '../state';
import PropertyTypes from '../types/property-types';
import ResourceTypes from '../types/resource-types';
import getGeneratedResource from './get-generated-resource';

export default function getResourceIncome(state: State, name: ResourceTypes) {
	let generate = 0;
	let tax = 0;
	let consume = 0;
	
	let propertyName: PropertyTypes;
	let totalProperties = 0;
	for(propertyName in state.properties) {
		let property = properties[propertyName];
		let propertyQuantity = state.properties[propertyName] ?? 0;
		totalProperties += propertyQuantity;

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

	if(name === 'Gold') {
		let taxPerProperty = state.skills['Tax Collector'] * (skills['Tax Collector'].perks.taxPerProperty ?? 0);
		tax += taxPerProperty * totalProperties;
	}

	return {
		income: (generate + tax - consume),
		tax,
		generate,
		consume
	};
}