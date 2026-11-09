module.exports = {
  default: {
    require: [
      'src/support/**/*.ts',
      'src/steps/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
  },
};
