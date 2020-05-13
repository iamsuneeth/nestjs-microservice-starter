import { ContextProvider } from './context.provider';

describe('Context provider', () => {
  test('should set new context on first invoke', () => {
    ContextProvider.set('key', 'value');
    expect(ContextProvider.get('key')).toBe('value');
  });
});
