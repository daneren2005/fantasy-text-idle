<template>
	<v-card>
		<v-toolbar color="primary">
			<v-tabs v-model="tab">
				<v-tab v-for="tabName in displayedTabs" :key="tabName" :value="tabName">{{ tabName }}</v-tab>
			</v-tabs>

			<v-spacer></v-spacer>
			
			<v-tooltip text="Settings" location="top">
  				<template v-slot:activator="{ props }">
					<v-btn icon @click="tab = 'Settings'" v-bind="props">
						<v-icon>settings</v-icon>
					</v-btn>
				</template>
			</v-tooltip>
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
import NobilityTab from './NobilityTab.vue';
import Actions from '@/game/types/actions';
import SettingsTab from './SettingsTab.vue';
import { computed } from 'vue';
import SkillsTab from './SkillsTab.vue';

defineProps<{
	state: State,
	actions: Actions
}>();

const tab = ref('Properties');
const tabs = {
	'Properties': PropertiesTab,
	'Nobility': NobilityTab,
	'Skills': SkillsTab,
	'Settings': SettingsTab
};
const displayedTabs = computed(() => Object.keys(tabs).filter(tab => tab !== 'Settings'));
</script>