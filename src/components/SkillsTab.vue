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
				<skill-row :state="state" :actions="actions" v-for="skill in allowedSkills" :key="skill" :skill-name="skill" />
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
import hasNobility from '@/game/utils/has-nobility';

const props = defineProps<{
	state: State,
	actions: Actions
}>();

const allowedSkills = computed(() => {
	let skillNames = Object.keys(props.state.skills) as Array<SkillTypes>;
	
	return skillNames.filter(propertyName => {
		let config = skills[propertyName];
		if(config.requireNobility) {
			return hasNobility(config.requireNobility, props.state);
		} else {
			return true;
		}
	});
});
</script>