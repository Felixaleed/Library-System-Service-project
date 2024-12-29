import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = (args.object as any)[relatedPropertyName];
      return value === relatedValue; // Check if value matches the related property's value
    }
  
    defaultMessage(args: ValidationArguments) {
      return `${args.property} must match ${args.constraints[0]}`;
    }
  }
  
  export function Match(
    property: string,
    validationOptions?: ValidationOptions,
  ) {
    return (object: any, propertyName: string) => {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: MatchConstraint,
      });
    };
  }
  