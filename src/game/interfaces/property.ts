import NobilityTypes from '../types/nobility-types';
import Resources from '../types/resources';
import UpgradeCosts from '../types/upgrade-costs';

interface Property {
	upgradeCosts: UpgradeCosts
	generate: Resources
	consume: Resources
	requireNobility?: NobilityTypes
}

export default Property;