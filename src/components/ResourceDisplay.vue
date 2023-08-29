<template>
	<div>
		{{ name }}: {{ Math.floor(currentAmount) }}

		<span v-if="income > 0" class="text-light-blue income">+{{ Math.round(income * 10) / 10 }}/sec</span>
		<span v-else-if="income < 0" class="text-red income">{{ Math.round(income * 10) / 10 }}/sec</span>
	</div>
</template>

<script setup lang="ts">
import State from '@/game/state';
import ResourceTypes from '@/game/types/resource-types';
import getResourceIncome from '@/game/utils/get-resource-income';
import { computed } from 'vue';

const props = defineProps<{
	state: State,
	name: ResourceTypes
}>();

const currentAmount = computed(() => props.state.resources[props.name] ?? 0);
const income = computed(() => getResourceIncome(props.state, props.name));
</script>

<style scoped>
.income {
	vertical-align: super;
}
</style>