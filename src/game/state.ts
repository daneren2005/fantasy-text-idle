import PropertyTypes from './types/property-types';
import ResourceTypes from './types/resource-types';

export default class State {
	running = true;
	gametime = 0;
	resources: {[K in ResourceTypes]?:number} = {
		Gold: 0,
		Food: 10
	};
	properties: {[K in PropertyTypes]?:number} = {
		'Farm': 0,
		'Lumber Mill': 0,
		'Food Stall': 1
	};
}