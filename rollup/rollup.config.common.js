// import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import visualizer from 'rollup-plugin-visualizer';
import typescript from 'rollup-plugin-typescript2';

export const plugins = [
	commonjs({
		include: 'node_modules/**',
	}),
	copy({
		targets: [{ src: './src/types/index.d.ts', dest: 'dist' }],
	}),
	visualizer(),
	typescript(),
];

export default {
	input: './src/index.ts',
	external: ['react', 'react-dom', 'styled-components'],
};
