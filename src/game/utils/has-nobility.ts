import nobilities from '../config/nobilities';
import State from '../state';
import NobilityTypes from '../types/nobility-types';

export default function hasNobility(nobility: NobilityTypes | undefined, state: State) {
	if(!nobility) {
		return true;
	}

	let currentNobilityLevel = state.nobility;

	return nobilities.slice(0, currentNobilityLevel + 1).map(n => n.name).includes(nobility);
}