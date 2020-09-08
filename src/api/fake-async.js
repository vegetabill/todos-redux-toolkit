export function withDelay(wrappedFunc) {
  return (...args) => {
    console.debug(`[Fake API] call to ${wrappedFunc.name}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(wrappedFunc(...args));
        } catch (e) {
          reject(e);
        }
      }, Math.random() * 100);
    });
  };
}
