import Resources from '@/game/types/resources';

export default function simpleResourcesString(resources: Resources) {
	return resources.map(resource => `${resource.name}: ${Math.round(resource.quantity * 10) / 10}`).join(', ');
}