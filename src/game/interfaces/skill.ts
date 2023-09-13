import NobilityTypes from '../types/nobility-types';
import ResourceTypes from '../types/resource-types';
import UpgradeCost from './upgrade-cost';

interface Skill {
	upgradePoints: UpgradeCost
	perks: {
		resourceMultipler?: {[K in ResourceTypes]?:number}
		propertyCostMultipler?: number
		taxPerProperty?: number
	}
	requireNobility?: NobilityTypes
}
export default Skill;