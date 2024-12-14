import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export type ClassType<T> = new (...args: any[]) => T;

export async function transformAndValidate<T extends object>(
  classType: ClassType<T>,
  somethingToTransform: object,
): Promise<T> {
  const isArray = Array.isArray(somethingToTransform);

  if (isArray) throw new Error('Cannot be array');

  const instance = plainToInstance(classType, somethingToTransform);

  const errors: ValidationError[] = await validate(instance);

  if (errors.length > 0) {
    throw errors;
  }

  return instance;
}

export async function transformAndValidateArray<T extends object>(
  classType: ClassType<T>,
  somethingToTransform: object[],
): Promise<T[]> {
  const isArray = Array.isArray(somethingToTransform);

  if (!isArray) throw new Error('Should be array');

  const instances = plainToInstance(classType, somethingToTransform);

  let errorsList: ValidationError[] = [];

  for (const instance of instances) {
    const errors: ValidationError[] = await validate(instance);
    errorsList = [...errorsList, ...errors];
  }

  if (errorsList.length > 0) {
    throw errorsList;
  }
  return instances;
}
