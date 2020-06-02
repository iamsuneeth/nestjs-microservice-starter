import { ContinuationLocalStorage } from 'asyncctx';
/**
 * Request scope data provider
 */
export class ContextProvider {
  private static _cls = new ContinuationLocalStorage<{ [key: string]: any }>();
  static get currentContext() {
    return this._cls.getContext();
  }

  static get<T>(key: string): T {
    return this._cls.getContext() && this._cls.getContext()[key];
  }

  /**
   * set function should be called outside of callbacks , promise handler functions
   * or before awaiting for any async operation. for more info visit
   * https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md
   * @param value
   */
  static set(key: string, value: any): void {
    if (!this._cls.getContext()) {
      this._cls.setContext({});
    }
    if (this._cls.getContext()[key]) {
      console.log('key exist');
      return;
    }
    this._cls.getContext()[key] = value;
  }

  readonly requestId: number;

  constructor(public readonly req: Request) {
    this.requestId = Date.now();
  }
}
