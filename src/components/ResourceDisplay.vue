<template>
	<div>
		{{ name }}: {{ formatNumber(currentAmount) }}

		<v-tooltip :text="tooltip" location="top">
			<template v-slot:activator="{ props }">
				<span v-if="income.income >= 0" class="text-light-blue income" v-bind="props">+{{ formatNumber(income.income) }}/sec</span>
				<span v-else-if="income.income < 0" class="text-red income" v-bind="props">{{ formatNumber(income.income) }}/sec</span>
			</template>
		</v-tooltip>
	</div>
</template>

<script setup lang="ts">
import State from '@/game/state';
import ResourceTypes from '@/game/types/resource-types';
import formatNumber from '@/game/utils/format-number';
import getResourceIncome from '@/game/utils/get-resource-income';
import { computed } from 'vue';

const props = defineProps<{
	state: State,
	name: ResourceTypes
}>();

const currentAmount = computed(() => props.state.resources[props.name] ?? 0);
const income = computed(() => getResourceIncome(props.state, props.name));
const tooltip = computed(() => {
	let tax = income.value.tax ? ` +${formatNumber(income.value.tax)} (taxes) ` : '';
	let consume = income.value.consume ? `- ${formatNumber(income.value.consume)}` : '';
	return `+${formatNumber(income.value.generate)} ${tax} ${consume} = ${formatNumber(income.value.income)}`;
});
</script>

<style scoped>
.income {
	vertical-align: super;
}
</style>