export function createSpyOf<T>(obj: new (...args: any[]) => T): SpyOf<T> {
  const res: SpyOf<T> = {} as any;

  const keys = [...Object.keys(obj.prototype), ...Object.getOwnPropertyNames(obj.prototype)];
  keys.forEach((key) => {
    // @ts-ignore
    res[key] = jest.fn();
  });

  return res;
}

export type SpyOf<T> = T &
  {
    [k in keyof T]: T[k] extends (...args: any[]) => infer R ? T[k] & jest.Mock<R> : T[k];
  };
