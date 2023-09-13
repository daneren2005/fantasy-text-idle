<template>
	<div>
		{{ name }}: {{ Math.floor(currentAmount) }}

		<v-tooltip :text="tooltip" location="top">
			<template v-slot:activator="{ props }">
				<span v-if="income.income >= 0" class="text-light-blue income" v-bind="props">+{{ Math.round(income.income * 10) / 10 }}/sec</span>
				<span v-else-if="income.income < 0" class="text-red income" v-bind="props">{{ Math.round(income.income * 10) / 10 }}/sec</span>
			</template>
		</v-tooltip>
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
const tooltip = computed(() => {
	let tax = income.value.tax ? ` +${income.value.tax} (taxes) ` : '';
	let consume = income.value.consume ? `- ${Math.round(income.value.consume * 10) / 10}` : '';
	return `+${Math.round(income.value.generate * 10) / 10} ${tax} ${consume} = ${Math.round(income.value.income * 10) / 10}`;
});
</script>

<style scoped>
.income {
	vertical-align: super;
}
</style>