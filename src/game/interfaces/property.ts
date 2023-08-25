import type ResourceTypes from '../types/resource-types';

interface Property {
	upgradeCosts: {[K in ResourceTypes]?:UpgradeCost}
	generate: Array<{name: ResourceTypes, quantity: number}>
	require: Array<{name: ResourceTypes, quantity: number}>
}

interface UpgradeCost {
	base: number
	exponent: number
}

export default Property;