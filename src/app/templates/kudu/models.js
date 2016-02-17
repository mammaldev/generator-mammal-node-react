import createBaseModel from './models/base';

// Export a list of model constructor factories. We can't just enumerate files
// in the "models" directory because a model that inherits from another must be
// created after its superclass.
export default [
  createBaseModel,
];
