export class InvalidRelationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRelationError';
  }
}
