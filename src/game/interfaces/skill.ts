import NobilityTypes from '../types/nobility-types';
import UpgradeCost from './upgrade-cost';

interface Skill {
	upgradePoints: UpgradeCost
	requireNobility?: NobilityTypes
}
export default Skill;