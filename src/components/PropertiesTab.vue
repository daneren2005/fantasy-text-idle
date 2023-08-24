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
				<property-row v-for="property in state.properties" :key="property.name" :property="property" :actions="actions" />
			</tbody>
		</v-table>
	</div>
</template>

<script setup lang="ts">
import type State from '@/game/state';
import type Actions from '@/game/types/actions';
import PropertyRow from './PropertyRow.vue';

defineProps<{
	state: State,
	actions: Actions
}>();
</script>

<style scoped>
.free {
	color: green;
	font-weight: bold;
}
</style>