import State from '../state';
import ResourceTypes from '../types/resource-types';

export default function hasResources(state: State, resources: Array<{name: ResourceTypes, quantity: number}>) {
	for(let i = 0; i < resources.length; i++) {
		let resource = resources[i];

		if((state.resources[resource.name] ?? 0) < resource.quantity) {
			return false;
		}
	}

	return true;
}