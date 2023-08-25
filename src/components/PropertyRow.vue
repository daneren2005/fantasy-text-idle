<template>
	<tr>
		<td>{{ propertyName }}</td>
		<td>{{ propertyQuantity }}</td>
		<td>
			{{ generateString }}
		</td>
		<td>
			{{ costsString }}
		</td>
		<td>
			<v-btn @click="actions.buyProperty(propertyName)" :color="buyColor">Buy</v-btn>
		</td>
	</tr>
</template>


<script setup lang="ts">
import properties from '@/game/config/properties';
import State from '@/game/state';
import type Actions from '@/game/types/actions';
import PropertyTypes from '@/game/types/property-types';
import type ResourceTypes from '@/game/types/resource-types';
import getNextLevelCost from '@/game/utils/get-next-level-cost';
import hasResources from '@/game/utils/has-resources';
import { computed } from 'vue';

const props = defineProps<{
	state: State
	propertyName: PropertyTypes
	actions: Actions
}>();
const property = computed(() => properties[props.propertyName]);
const propertyQuantity = computed(() => props.state.properties[props.propertyName] ?? 0);

const generateString = computed(() => {
	let requiredString = simpleResourcesString(property.value.require);
	let generateString = simpleResourcesString(property.value.generate);

	if(requiredString) {
		return `${requiredString} -> ${generateString}`;
	} else {
		return generateString;
	}
});

const costsString = computed(() => {
	let costs = getNextLevelCost(props.state, props.propertyName);
	return simpleResourcesString(costs);
});

function simpleResourcesString(resources: Array<{name: ResourceTypes, quantity: number}>) {
	return resources.map(resource => `${resource.name}: ${resource.quantity}`).join(', ');
}

const buyColor = computed(() => hasResources(props.state, getNextLevelCost(props.state, props.propertyName)) ? 'primary' : 'error');
</script>