import { Metadata } from 'grpc';
import { ContextProvider } from '@app/infra';

export function setRpcMetadata(args: any[]): any[] {
  const subject = ContextProvider.get('user');

  const meta = (args[1] as Metadata) || new Metadata();
  if (subject) {
    meta.set('subject', JSON.stringify(subject));
  }
  if (args.length === 0) {
    args = [{}, meta];
  } else {
    args = [...args, meta];
  }
  return args;
}
