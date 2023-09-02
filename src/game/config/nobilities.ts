import Nobility from '../interfaces/nobility';

const nobilities: Array<Nobility> = [
	{
		name: 'Peasant',
		upgradeCosts: {},
		skillPoints: 1
	},
	{
		name: 'Land Owner',
		upgradeCosts: {
			Gold: {
				base: 40,
				exponent: 2
			}
		},
		skillPoints: 2
	},
	{
		name: 'Merchant',
		upgradeCosts: {
			Gold: {
				base: 80,
				exponent: 2
			}
		},
		skillPoints: 3
	}
];
export default nobilities;