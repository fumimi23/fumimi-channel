const config = [
	{
		ignores: [
			'**/routeTree.gen.ts',
		],
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
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@stylistic/indent': 'off',
		},
	},
	{
		files: ['**/routeTree.gen.ts'],
		rules: {
			'unicorn/no-abusive-eslint-disable': 'off',
		},
	},
	{
		files: ['**/vite.config.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-call': 'off',
		},
	},
];

export default config;
