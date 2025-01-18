import rscssPlugin from 'stylelint-rscss';
import rscssConfig from 'stylelint-rscss/config/index.js';

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    // Stylelint v16 以降では 'stylelint-rscss/config' だと動かない
    {
      ...rscssConfig,
      plugins: [rscssPlugin.default],
    },
  ],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'no-empty-source': true,
    'selector-pseudo-element-no-unknown': true,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'property-no-unknown': true,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': [
      '',
      {
        resolveNestedSelectors: true,
      },
    ],
    'max-nesting-depth': [
      2,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['include'],
      },
    ],
    'rscss/class-format': [
      true,
      {
        component: '^[a-z0-9]+[A-Z][a-zA-Z0-9]+$',
        element: '^[a-z0-9]+$',
        helper: '^_[a-zA-Z0-9]+$',
        variant: '^[A-Z][a-zA-Z0-9]+$',
      },
    ],
  },
};
