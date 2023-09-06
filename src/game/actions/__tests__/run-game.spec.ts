import { describe, it, expect, beforeEach } from 'vitest';
import runGame from '../run-game';
import State from '@/game/state';
import properties from '@/game/config/properties';


describe('run-game', () => {
	let state: State;
	beforeEach(() => {
		state = new State();
	});

	it('increments game time', () => {
		runGame(state, 20);
		expect(state.gametime).toEqual(20);

		expect(state.resources['Gold']).toBeGreaterThan(0);
		expect(state.resources['Food']).toBeLessThan((new State()).resources['Food'] ?? 0);
	});

	it('multiple properties generate resource faster', () => {
		state.properties['Food Stall'] = 0;
		state.properties['Farm'] = 1;
		const farmRate = properties['Farm'].generate[0].quantity;

		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(10 + farmRate);
		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(10 + farmRate * 2);
		
		state.properties['Farm'] = 4;
		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(10 + farmRate * 6);
	});

	it('multiple properties consume resource faster', () => {
		state.properties['Food Stall'] = 1;
		const startFood = state.resources['Food'] = 1_000;
		const foodRate = properties['Food Stall'].consume[0].quantity;
		const goldRate = properties['Food Stall'].generate[0].quantity;

		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(startFood - foodRate);
		expect(state.resources['Gold']).toEqual(goldRate);
		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(startFood - foodRate * 2);
		expect(state.resources['Gold']).toEqual(goldRate * 2);
		
		state.properties['Food Stall'] = 5;
		runGame(state, 1_000);
		expect(state.resources['Food']).toEqual(startFood - foodRate * 7);
		expect(state.resources['Gold']).toEqual(goldRate * 7);
	});

	it('can run partial consumption updates', () => {
		state.properties['Food Stall'] = 1;
		state.properties['Farm'] = 1;
		state.resources = {};
		const goldRate = properties['Food Stall'].generate[0].quantity;

		const RUN_TICKS = 10;
		for(let i = 0; i < RUN_TICKS; i++) {
			runGame(state, 1_000);
			expect(state.resources['Food']).toBeGreaterThanOrEqual(0);
		}

		expect(state.resources['Gold']).toBeGreaterThan(0);
		expect(state.resources['Gold']).toBeLessThan(goldRate * RUN_TICKS);
	});

	it('add skill points based on nobility level', () => {
		runGame(state, 1_000);
		expect(state.skill).toEqual(1);

		state.nobility++;
		runGame(state, 1_000);
		expect(state.skill).toBeGreaterThan(2);
	});
});