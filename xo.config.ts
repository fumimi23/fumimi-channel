const config = {
	rules: {
		'n/prefer-global/process': ['error', 'always'],
		'unicorn/filename-case': [
			'error',
			{
				case: 'kebabCase',
				ignore: [
					// React コンポーネントは PascalCase を許可
					/\.tsx$/,
				],
			},
		],
		'@typescript-eslint/no-unsafe-assignment': 'off',
	},
};

export default config;
