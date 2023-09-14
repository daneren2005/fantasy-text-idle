import PropertyTypes from './types/property-types';
import ResourceTypes from './types/resource-types';
import SkillTypes from './types/skill-types';

export default class State {
	running = true;
	gametime = 0;
	nobility = 0;
	resources: {[K in ResourceTypes]?:number} = {
		'Skill Point': 0,
		Gold: 0,
		Food: 10
	};
	properties: {[K in PropertyTypes]:number} = {
		'Farm': 0,
		'Lumber Mill': 0,
		'Food Stall': 1,
		'Mine': 0,
		'Blacksmith': 0,
		'Paper Mill': 0,
		'Publisher House': 0,
		'University': 0,
		'Clay Pit': 0,
		'Pottery Barn': 0
	};
	skills: {[K in SkillTypes]:number} = {
		'Green Thumb': 0,
		'Negotiator': 0,
		'Lender': 0,
		'Tax Collector': 0
	};

	clone() {
		let clone = new State();

		for(let prop in this) {
			// eslint-disable-next-line
			if(Object.getPrototypeOf(this[prop]).isPrototypeOf(Object) && Object.getPrototypeOf(this[prop]).isPrototypeOf(Object)) {
				for(let subProp in this[prop]) {
					// @ts-expect-error
					clone[prop][subProp] = this[prop][subProp];
				}
			} else {
				// @ts-expect-error
				clone[prop] = this[prop];
			}
		}

		return clone;
	}
	save() {
		return JSON.stringify({
			running: this.running,
			gametime: this.gametime,
			nobility: this.nobility,
			resources: this.resources,
			properties: this.properties,
			skills: this.skills
		});
	}
	load(config: any) {
		Object.keys(config).forEach(key => {
			// @ts-expect-error
			// eslint-disable-next-line
			if(Object.getPrototypeOf(config[key]).isPrototypeOf(Object) && Object.getPrototypeOf(this[key]).isPrototypeOf(Object)) {
				// If we add a new skill or property, want to do this recursively so they get added to the list
				for(let subKey in config[key]) {
					// @ts-expect-error
					this[key][subKey] = config[key][subKey];
				}
			} else {
				// @ts-expect-error
				this[key] = config[key];
			}
		});
	}
}