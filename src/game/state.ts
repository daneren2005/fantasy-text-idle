import type Property from './interfaces/property';

export default class State {
	running = true;
	gametime = 0;
	resources = {
		Gold: 0,
		Food: 10
	};
	properties: Array<Property> = [
		{
			name: 'Farm',
			quantity: 0,
			upgradeCosts: {
				Gold: {
					base: 5
				}
			},
			generate: {
				Food: 1
			},
			require: {}
		},
		{
			name: 'Food Stall',
			quantity: 1,
			upgradeCosts: {
				Gold: {
					base: 10
				}
			},
			generate: {
				Gold: 1
			},
			require: {
				Food: 2
			}
		}
	];
}