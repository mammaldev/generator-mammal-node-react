// Create a Kudu "Base" model from which other models can inherit. Properties
// specified in the Base model schema should be common to all models. The Base
// model is non-requestable which means the generic API route handlers will not
// respond to requests related to it (e.g. GET /api/base).
export default function createBaseModel( kudu ) {

  const Base = kudu.createModel('base', {
    requestable: false,
    properties: {
      createdAt: {
        type: Date,
        required: true,
      },
      updatedAt: {
        type: Date,
        required: true,
      },
    },
    hooks: {
      onCreate() {
        this.createdAt = this.updatedAt = new Date();
      },
      onUpdate() {
        this.updatedAt = new Date();
      },
    },
  });

  return Base;
}
