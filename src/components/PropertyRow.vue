<template>
	<tr>
		<td>{{ property.name }}</td>
		<td>{{ property.quantity }}</td>
		<td>
			{{ generateString }}
		</td>
		<td>
			
		</td>
		<td>
			<v-btn @click="actions.buyProperty(property)" color="primary">Buy</v-btn>
		</td>
	</tr>
</template>


<script setup lang="ts">
import type Property from '@/game/interfaces/property';
import type Actions from '@/game/types/actions';
import type ResourceTypes from '@/game/types/resource-types';
import { computed } from 'vue';

const props = defineProps<{
	property: Property
	actions: Actions
}>();

const generateString = computed(() => {
	let requiredString = (Object.keys(props.property.require) as Array<ResourceTypes>).map(key => {
		return `${key}: ${(props.property.require[key] ?? 1) * props.property.quantity}`;
	}).join(', ');

	let generateString = (Object.keys(props.property.generate) as Array<ResourceTypes>).map(key => {
		return `${key}: ${(props.property.generate[key] ?? 1) * props.property.quantity}`;
	}).join(', ');

	if(requiredString) {
		return `${requiredString} -> ${generateString}`;
	} else {
		return generateString;
	}
});
</script>