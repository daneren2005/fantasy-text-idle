import Property from '../interfaces/property';
import PropertyTypes from '../types/property-types';

const properties: {[K in PropertyTypes]:Property} = {
	'Farm': {
		upgradeCosts: {
			Gold: {
				base: 2,
				exponent: 1.5
			}
		},
		generate: [
			{
				name: 'Food',
				quantity: 1
			}
		],
		require: []
	},
	'Lumber Mill': {
		upgradeCosts: {
			Gold: {
				base: 5,
				exponent: 1.5
			}
		},
		generate: [
			{
				name: 'Wood',
				quantity: 2
			}
		],
		require: [
			{
				name: 'Food',
				quantity: 1
			}
		]
	},
	'Food Stall': {
		upgradeCosts: {
			Gold: {
				base: 4,
				exponent: 1.5
			},
			Wood: {
				base: 5,
				exponent: 2
			}
		},
		generate: [
			{
				name: 'Gold',
				quantity: 1
			}
		],
		require: [
			{
				name: 'Food',
				quantity: 2
			}
		]
	}
};

export default properties;