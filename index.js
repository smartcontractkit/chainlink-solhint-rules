/* eslint-disable @typescript-eslint/no-var-requires */
const PrefixInternalFunctionsWithUnderscore = require('./rules/prefixInternalFunctionsWithUnderscore.js');
const PrefixPrivateFunctionsWithUnderscore = require('./rules/prefixPrivateFunctionsWithUnderscore.js');
const PrefixStorageVariablesWithSUnderscore = require('./rules/prefixStorageVariablesWithSUnderscore.js');
const PrefixImmutableVariablesWithI = require('./rules/prefixImmutableVariablesWithI');
const AllCapsConstantStorageVariables = require('./rules/allCapsConstantStorageVariables.js');
const NoHardhatImports = require('./rules/noHardhatImports.js');
const InheritedConstructorArgsNotInContractDefinition = require('./rules/inheritedConstructorArgsNotInContractDefinition.js');
const NoBlockSingleIfReverts = require('./rules/noBlockSingleIfReverts.js');
const ExplicitReturns = require('./rules/explicitReturns.js');

module.exports = [
  PrefixInternalFunctionsWithUnderscore,
  PrefixPrivateFunctionsWithUnderscore,
  PrefixStorageVariablesWithSUnderscore,
  PrefixImmutableVariablesWithI,
  AllCapsConstantStorageVariables,
  NoHardhatImports,
  InheritedConstructorArgsNotInContractDefinition,
  NoBlockSingleIfReverts,
  ExplicitReturns,
];
