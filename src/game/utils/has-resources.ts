import State from '../state';
import Resources from '../types/resources';

export default function hasResources(state: State, resources: Resources) {
	for(let i = 0; i < resources.length; i++) {
		let resource = resources[i];

		if((state.resources[resource.name] ?? 0) < resource.quantity) {
			return false;
		}
	}

	return true;
}