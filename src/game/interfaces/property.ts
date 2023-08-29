import Resources from '../types/resources';
import UpgradeCosts from '../types/upgrade-costs';

interface Property {
	upgradeCosts: UpgradeCosts
	generate: Resources
	consume: Resources
}

export default Property;