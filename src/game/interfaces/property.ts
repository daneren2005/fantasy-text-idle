import type PropertyTypes from '../types/property-types';
import type ResourceTypes from '../types/resource-types';

interface Property {
	name: PropertyTypes
	quantity: number
	upgradeCosts: {[K in ResourceTypes]?:UpgradeCost}
	generate: {[K in ResourceTypes]?:number}
	require: {[K in ResourceTypes]?:number}
}

interface UpgradeCost {
	base: number
}

export default Property;