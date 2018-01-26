const czConfig = require('./.cz-config');

module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [1, 'always', 100],
    'scope-enum': [1, 'always', czConfig.scopes.map((scope) => scope.name)],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [1, 'never', '.'],
    'type-enum': [2, 'always', czConfig.types.map((type) => type.value)],
    'type-case': [2, 'always', 'lower-case'],
  }
}
