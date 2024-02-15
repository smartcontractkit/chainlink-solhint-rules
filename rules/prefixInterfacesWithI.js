class PrefixInterfacesWithI {
  constructor(reporter, config) {
    this.ruleId = "prefix-interfaces-with-i";
    this.reporter = reporter;
    this.config = config;
  }

  ContractDefinition(ctx) {
    const { type, kind, name } = ctx;

    if (kind === "interface") {
      if (name.endsWith("Interface")) {
        this.reporter.error(
          ctx,
          this.ruleId,
          `Interface ${name} is suffixed with 'Interface', should instead be prefixed with 'I' e.g. 'IFoo'`
        );
      } else if (!name.startsWith("I")) {
        this.reporter.error(
          ctx,
          this.ruleId,
          `Interface ${name} is not prefixed with 'I', e.g. 'IFoo'`
        );
      }
    }
  }
}

module.exports = PrefixInterfacesWithI;
