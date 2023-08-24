<template>
	<v-card>
		<v-toolbar color="primary">
			<v-tabs v-model="tab">
				<v-tab v-for="(component, tabName) in tabs" :key="tabName" :value="tabName">{{ tabName }}</v-tab>
			</v-tabs>
		</v-toolbar>

		<v-window v-model="tab">
			<v-window-item v-for="(component, tabName) in tabs" :key="tabName" :value="tabName">
				<component :is="component" :state="state" :actions="actions" />
			</v-window-item>
		</v-window>
	</v-card>
</template>

<script setup lang="ts">
import type State from '@/game/state';
import { ref } from 'vue';
import PropertiesTab from './PropertiesTab.vue';
import ResearchTab from './ResearchTab.vue';
import Actions from '@/game/types/actions';

defineProps<{
	state: State,
	actions: Actions
}>();

const tab = ref(null);
const tabs = {
	'Properties': PropertiesTab,
	'Research': ResearchTab
};
</script>