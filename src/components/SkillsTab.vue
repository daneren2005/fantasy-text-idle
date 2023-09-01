<template>
	<div>
		<v-table>
			<thead>
				<tr>
					<th>Skill</th>
					<th>Level</th>
					<th>Benefit</th>
					<th>Upgrade Cost</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody>
				<skill-row :state="state" :actions="actions" v-for="skill in allowedSkills" :skill-name="skill" />
			</tbody>
		</v-table>
	</div>
</template>

<script setup lang="ts">
import State from '@/game/state';
import Actions from '@/game/types/actions';
import SkillRow from './SkillRow.vue';
import { computed } from 'vue';
import SkillTypes from '@/game/types/skill-types';
import skills from '@/game/config/skills';
import nobilities from '@/game/config/nobilities';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const allowedSkills = computed(() => {
	let skillNames = Object.keys(props.state.skills) as Array<SkillTypes>;
	
	return skillNames.filter(propertyName => {
		let config = skills[propertyName];
		if(config.requireNobility) {
			return nobilities[props.state.nobility].name === config.requireNobility;
		} else {
			return true;
		}
	});
});
</script>