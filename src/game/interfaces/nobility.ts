import NobilityTypes from '../types/nobility-types';
import UpgradeCosts from '../types/upgrade-costs';

interface Nobility {
	name: NobilityTypes
	upgradeCosts: UpgradeCosts
	skillPoints: number
}

export default Nobility;