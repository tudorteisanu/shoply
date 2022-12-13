/**
 * Config for @typescript-eslint/naming-convention eslint rule.
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
 */

module.exports = [
  {
    selector: "default",
    format: ["camelCase"],
    leadingUnderscore: "allow",
    trailingUnderscore: "allow",
  },
  {
    selector: "variable",
    format: ["camelCase", "UPPER_CASE"],
    leadingUnderscore: "allow",
    trailingUnderscore: "allow",
  },
  {
    selector: "variable",
    types: ["function"],
    format: ["PascalCase", "camelCase"],
  },
  {
    selector: "function",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    selector: "classMethod",
    format: ["camelCase"],
  },
  {
    selector: "parameter",
    format: ["camelCase", "PascalCase"],
    leadingUnderscore: "allow",
    trailingUnderscore: "allow",
  },
  {
    selector: "objectLiteralMethod",
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    selector: "objectLiteralProperty",
    format: ["camelCase", "PascalCase"],
  },
  {
    selector: "enumMember",
    format: ["PascalCase"],
  },
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
];
