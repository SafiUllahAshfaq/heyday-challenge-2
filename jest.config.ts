import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import tsconfig from './tsconfig.json';
const paths = tsconfig.compilerOptions.paths as Record<string, string[]>;

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
