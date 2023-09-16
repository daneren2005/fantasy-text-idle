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
				base: 100,
				exponent: 2
			}
		},
		skillPoints: 2
	},
	{
		name: 'Merchant',
		upgradeCosts: {
			Gold: {
				base: 1_000,
				exponent: 2
			}
		},
		skillPoints: 3
	},
	{
		name: 'Lord',
		upgradeCosts: {
			Gold: {
				base: 10_000,
				exponent: 2
			}
		},
		skillPoints: 4
	},
	{
		name: 'King',
		upgradeCosts: {
			Gold: {
				base: 100_000,
				exponent: 2
			}
		},
		skillPoints: 4
	}
];
export default nobilities;