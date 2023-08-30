import Nobility from '../interfaces/nobility';

const nobilities: Array<Nobility> = [
	{
		name: 'Peasant',
		perks: {},
		upgradeCosts: {}
	},
	{
		name: 'Land Owner',
		perks: {
			propertyCostMultipler: 0.95
		},
		upgradeCosts: {
			Gold: {
				base: 40,
				exponent: 2
			}
		}
	},
	{
		name: 'Merchant',
		perks: {
			propertyCostMultipler: 0.90,
			resourceMultipler: {
				Gold: 1.1
			}
		},
		upgradeCosts: {
			Gold: {
				base: 80,
				exponent: 2
			}
		}
	}
];
export default nobilities;