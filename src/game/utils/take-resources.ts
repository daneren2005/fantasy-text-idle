import State from '../state';
import Resources from '../types/resources';

export default function takeResources(state: State, resources: Resources) {
	for(let i = 0; i < resources.length; i++) {
		let resource = resources[i];

		state.resources[resource.name] = (state.resources[resource.name] ?? 0) - resource.quantity;
	}
}