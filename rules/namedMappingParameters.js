const meta = {
  type: "naming",

  docs: {
    description: `Mapping types should have named parameters.`,
    category: "Style Guide Rules",
    notes: [
      {
        note: "Named parameters in mapping types were added in solidity version 0.8.18",
        note: "If using an early version, this rule will be ignored",
      },
    ],
    examples: {
      good: [
        {
          description: "Mapping declaration has named parameters",
          code: "mapping(address reporter => bool isAllowed) private s_accessControl;",
        },
      ],
      bad: [
        {
          description: "Mapping declaration DOES NOT have named parameters",
          code: "mapping(address => bool) private s_accessControl;",
        },
      ],
    },
  },

  isDefault: false,
  recommended: true,
  defaultSetup: "warn",

  schema: null,
};

class NamedMappingParameters {
  supportedVersion = "0.8.18";

  constructor(reporter, config) {
    this.ruleId = "named-mapping-parameters";
    this.reporter = reporter;
    this.config = config;
    this.meta = meta;
    this.active = false;
  }

  PragmaDirective(ctx) {
    const { name, value } = ctx;

    if (name === "solidity") {
      const [
        supportedMajorVersion,
        supportedMinorVersion,
        supportedPatchVersion,
      ] = this.supportedVersion.split(".");

      const [currentMajorVersion, currentMinorVersion, currentPatchVersion] =
        value.replace(/[^0-9.]/g, "").split(".");

      if (
        currentMajorVersion >= supportedMajorVersion &&
        currentMinorVersion >= supportedMinorVersion &&
        currentPatchVersion >= supportedPatchVersion
      ) {
        this.active = true;
      }
    }
  }

  ContractDefinition(ctx) {
    if (this.active) {
      const { subNodes } = ctx;
      for (const subNode of subNodes) {
        const { type: subNodeType, variables } = subNode;
        if (subNodeType === "StateVariableDeclaration") {
          for (const variable of variables) {
            const {
              type: variableType,
              typeName: { type, keyName, valueName },
            } = variable;
            if (
              variableType === "VariableDeclaration" &&
              type === "Mapping" &&
              (keyName === null || valueName === null)
            ) {
              this.reporter.error(
                subNode,
                this.ruleId,
                `Mappings must be declared with named parameters`
              );
            }
          }
        }
      }
    }
  }
}

module.exports = NamedMappingParameters;
