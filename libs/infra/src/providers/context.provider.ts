import { ContinuationLocalStorage } from 'asyncctx';

export class ContextProvider {
  private static _cls = new ContinuationLocalStorage<{ [key: string]: any }>();
  static get currentContext() {
    return this._cls.getContext();
  }

  static get<T>(key: string): T {
    return this._cls.getContext() && this._cls.getContext()[key];
  }

  static set(key: string, value: any): void {
    if (!this._cls.getContext()) {
      this._cls.setContext({});
    }
    this._cls.getContext()[key] = value;
  }

  readonly requestId: number;

  constructor(public readonly req: Request) {
    this.requestId = Date.now();
  }
}
