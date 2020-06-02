import { SetMetadata } from '@nestjs/common';

export const Resource = (options: { name: string }) =>
  SetMetadata('resource', options);
