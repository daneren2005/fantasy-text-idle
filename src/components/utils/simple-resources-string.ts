import Resources from '@/game/types/resources';
import formatNumber from '@/game/utils/format-number';

export default function simpleResourcesString(resources: Resources) {
	return resources.map(resource => `${resource.name}: ${formatNumber(resource.quantity)}`).join(', ');
}