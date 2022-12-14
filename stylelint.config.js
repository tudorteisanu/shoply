/* eslint-disable @typescript-eslint/naming-convention */

module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    indentation: 2,
    "string-quotes": "double",
    "comment-whitespace-inside": "always",
    "no-invalid-position-at-import-rule": true,
    "string-no-newline": true,
    "custom-property-no-missing-var-function": true,
    "declaration-block-trailing-semicolon": "always",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-no-shorthand-property-overrides": true,
    "no-extra-semicolons": true,
    "max-line-length": [
      70,
      {
        ignorePattern: "/^url(.*)/",
      },
    ],
    "no-eol-whitespace": true,
    "function-whitespace-after": "always",
    "block-no-empty": true,
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: [],
      },
    ],
    "no-descending-specificity": null,
    "at-rule-no-unknown": null,
    "unit-allowed-list": [
      ["rem", "em", "%", "vh", "vw", "s", "ms", "vmin", "vmax", "deg", "fr"],
      {
        ignoreProperties: {
          px: ["/^border|outline|box-shadow/"],
        },
      },
    ],
    "selector-class-pattern": null,
  },
};
