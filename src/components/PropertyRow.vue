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
import { getNextLevelCostProperty } from '@/game/utils/get-next-level-cost';
import hasResources from '@/game/utils/has-resources';
import { computed } from 'vue';
import simpleResourcesString from './utils/simple-resources-string';
import nobilities from '@/game/config/nobilities';

const props = defineProps<{
	state: State
	propertyName: PropertyTypes
	actions: Actions
}>();
const property = computed(() => properties[props.propertyName]);
const propertyQuantity = computed(() => props.state.properties[props.propertyName] ?? 0);

const nobilityConfig = computed(() => nobilities[props.state.nobility]);
const generateString = computed(() => {
	let consumeString = simpleResourcesString(property.value.consume.map(resource => ({
		name: resource.name,
		quantity: resource.quantity * (props.state.properties[props.propertyName] ?? 0)
	})));
	let generateString = simpleResourcesString(property.value.generate.map(resource => {
		let resourceMultiplier = 1;
		let nobilityMultiplier = nobilityConfig.value.perks.resourceMultipler?.[resource.name];
		if(nobilityMultiplier) {
			resourceMultiplier = nobilityMultiplier;
		}

		return {
			name: resource.name,
			quantity: resource.quantity * (props.state.properties[props.propertyName] ?? 0) * resourceMultiplier
		};
	}));

	if(consumeString) {
		return `${consumeString} -> ${generateString}`;
	} else {
		return generateString;
	}
});

const costsString = computed(() => {
	let costs = getNextLevelCostProperty(props.state, props.propertyName);
	return simpleResourcesString(costs);
});

const buyColor = computed(() => hasResources(props.state, getNextLevelCostProperty(props.state, props.propertyName)) ? 'primary' : 'error');
</script>