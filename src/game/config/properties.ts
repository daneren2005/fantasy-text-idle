import Property from '../interfaces/property';
import PropertyTypes from '../types/property-types';

const properties: {[K in PropertyTypes]:Property} = {
	'Farm': {
		upgradeCosts: {
			Gold: {
				base: 2,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Food',
				quantity: 1
			}
		],
		consume: []
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
		consume: [
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
				exponent: 1.4
			},
			Wood: {
				base: 5,
				exponent: 1.4
			}
		},
		generate: [
			{
				name: 'Gold',
				quantity: 1
			}
		],
		consume: [
			{
				name: 'Food',
				quantity: 2
			}
		]
	},
	'Mine': {
		upgradeCosts: {
			Gold: {
				base: 50,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Iron Ore',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Food',
				quantity: 1
			}
		],
		requireNobility: 'Land Owner'
	},
	'Blacksmith': {
		upgradeCosts: {
			Gold: {
				base: 100,
				exponent: 1.5
			}
		},
		generate: [
			{
				name: 'Gold',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Iron Ore',
				quantity: 20
			},
			{
				name: 'Food',
				quantity: 2
			}
		],
		requireNobility: 'Merchant'
	},
	'Paper Mill': {
		upgradeCosts: {
			Gold: {
				base: 50,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Paper',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Wood',
				quantity: 2
			},
			{
				name: 'Food',
				quantity: 1
			}
		],
		requireNobility: 'Lord'
	},
	'Publisher House': {
		upgradeCosts: {
			Gold: {
				base: 200,
				exponent: 1.5
			}
		},
		generate: [
			{
				name: 'Gold',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Paper',
				quantity: 20
			}
		],
		requireNobility: 'Lord'
	},
	'University': {
		upgradeCosts: {
			Gold: {
				base: 50,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Skill Point',
				quantity: 1
			}
		],
		consume: [
			{
				name: 'Paper',
				quantity: 20
			}
		],
		requireNobility: 'Lord'
	},
	'Clay Pit': {
		upgradeCosts: {
			Gold: {
				base: 500,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Clay',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Food',
				quantity: 1
			}
		],
		requireNobility: 'King'
	},
	'Pottery Barn': {
		upgradeCosts: {
			Gold: {
				base: 500,
				exponent: 1.2
			}
		},
		generate: [
			{
				name: 'Gold',
				quantity: 10
			}
		],
		consume: [
			{
				name: 'Clay',
				quantity: 2
			},
			{
				name: 'Food',
				quantity: 2
			}
		],
		requireNobility: 'King'
	}
};

export default properties;