import { Metadata } from 'grpc';

import { ContextProvider } from '../../../infra/src/providers/context.provider';

export function setRpcMetadata(args: any[]): any[] {
  const user = ContextProvider.get('user') as any;

  const meta = (args[1] as Metadata) || new Metadata();
  if (user) {
    meta.set('authorization', `Bearer ${user.token}`);
  }
  if (args.length === 0) {
    args = [{}, meta];
  } else {
    args = [...args, meta];
  }
  return args;
}
