// Rule: Returned values should always be explicit.
// Using named return values and then returning with an empty return should be avoided.
class ExplicitReturns {
  constructor(reporter, config) {
    this.ruleId = 'explicit-returns';
    this.reporter = reporter;
    this.config = config;
  }

  FunctionDefinition(ctx) {
    const { returnParameters, body } = ctx;
    // collect all VariableDeclaration nodes with non-null "name" property
    // in the returnParameters array
    let namedReturns = [];
    for (let i = 0; i < returnParameters.length; i++) {
      const varDecl = returnParameters[i];
      if (varDecl.name != null) {
        namedReturns.push(varDecl.name);
      }
    }
    // if there are no named returns, return
    if (namedReturns.length === 0) {
      return;
    }

    // check if body has a ReturnStatement with a non-null "expression" property
    let hasReturn = false;
    let hasReturnExpression = false;
    const { statements } = body;
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      // Functions with named returns in solidity need not have a return statement
      // they can just assign the named returns a value and fall off the end of the function
      // we want to warn against that explicitly, hence the check for "ReturnStatement"
      // and for the expression being separate.
      if (stmt.type === 'ReturnStatement') {
        hasReturn = true;
        if (stmt.expression != null) {
          hasReturnExpression = true;
          break;
        }
      }
    }
    const returnExprGen = (namedRets) => {
      if (namedRets.length === 1) {
        return namedRets[0];
      }
      return `(${namedRets.join(', ')})`;
    }
    if (!hasReturn) {
      this.reporter.error(
        ctx,
        this.ruleId,
        `Return statements must be written and must explicitly return something; consider "return ${returnExprGen(namedReturns)};"?`);
      return;
    }
    if (!hasReturnExpression) {
      this.reporter.error(
        ctx,
        this.ruleId,
        `Return statements must explicitly return something; consider "return ${returnExprGen(namedReturns)};"?`);
      return;
    }
  }
}

module.exports = ExplicitReturns;
