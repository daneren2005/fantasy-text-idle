import ResourceTypes from '../types/resource-types';
import UpgradeCosts from '../types/upgrade-costs';

interface Nobility {
	name: string
	perks: {
		resourceMultipler?: {[K in ResourceTypes]?:number}
		propertyCostMultipler?: number
	}
	upgradeCosts: UpgradeCosts
}

export default Nobility;