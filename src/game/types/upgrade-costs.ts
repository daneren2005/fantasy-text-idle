import ResourceTypes from './resource-types';
import UpgradeCost from '../interfaces/upgrade-cost';

type UpgradeCosts = {[K in ResourceTypes]?:UpgradeCost};
export default UpgradeCosts;