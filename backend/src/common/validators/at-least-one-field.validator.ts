import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'atLeastOneField' })
export class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const object = args.object as Record<string, unknown>;
    return Object.values(object).some(
      (v) => v !== undefined && v !== null && v !== '',
    );
  }

  defaultMessage() {
    return 'At least one field must be provided';
  }
}

export function AtLeastOneField(validationOptions?: ValidationOptions) {
  return function (constructor: Function) {
    registerDecorator({
      target: constructor,
      propertyName: 'undefined',
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneFieldConstraint,
    });
  };
}
