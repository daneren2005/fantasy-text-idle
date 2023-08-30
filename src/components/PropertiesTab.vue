<template>
	<div>
		<v-table>
			<thead>
				<tr>
					<th>Property</th>
					<th>Quantity</th>
					<th>Generates/sec</th>
					<th>Upgrade Cost</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody>
				<property-row v-for="propertyName in allowedProperties" :key="propertyName" :state="state" :property-name="propertyName" :actions="actions" />
			</tbody>
		</v-table>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';
import type Actions from '@/game/types/actions';
import PropertyRow from './PropertyRow.vue';
import { computed } from 'vue';
import PropertyTypes from '@/game/types/property-types';
import properties from '@/game/config/properties';
import nobilities from '@/game/config/nobilities';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const allowedProperties = computed(() => {
	let propertyNames = Object.keys(props.state.properties) as Array<PropertyTypes>;
	
	return propertyNames.filter(propertyName => {
		let propertyConfig = properties[propertyName];
		if(propertyConfig.requireNobility) {
			return nobilities[props.state.nobility].name === propertyConfig.requireNobility;
		} else {
			return true;
		}
	});
});
</script>

<style scoped>
.free {
	color: green;
	font-weight: bold;
}
</style>