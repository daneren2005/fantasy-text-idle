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

	save() {
		return JSON.stringify({
			running: this.running,
			gametime: this.gametime,
			resources: this.resources,
			properties: this.properties
		});
	}
	load(config: any) {
		Object.keys(config).forEach(key => {
			// @ts-expect-error
			this[key] = config[key];
		});
	}
}