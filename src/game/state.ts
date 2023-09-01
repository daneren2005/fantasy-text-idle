import PropertyTypes from './types/property-types';
import ResourceTypes from './types/resource-types';
import SkillTypes from './types/skill-types';

export default class State {
	running = true;
	gametime = 0;
	nobility = 0;
	resources: {[K in ResourceTypes]?:number} = {
		Gold: 0,
		Food: 10
	};
	properties: {[K in PropertyTypes]:number} = {
		'Farm': 0,
		'Lumber Mill': 0,
		'Food Stall': 1,
		'Paper Mill': 0,
		'Publisher House': 0
	};
	skill: number = 0;
	skills: {[K in SkillTypes]:number} = {
		'Green Thumb': 0,
		'Negotiator': 0
	};

	save() {
		return JSON.stringify({
			running: this.running,
			gametime: this.gametime,
			nobility: this.nobility,
			resources: this.resources,
			properties: this.properties,
			skill: this.skill,
			skills: this.skills
		});
	}
	load(config: any) {
		Object.keys(config).forEach(key => {
			// @ts-expect-error
			this[key] = config[key];
		});
	}
}