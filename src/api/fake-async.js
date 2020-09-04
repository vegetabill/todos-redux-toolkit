export function withDelay(wrappedFunc) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        try {
          resolve(wrappedFunc(...args));
        } catch (e) {
          reject(e);
        }
      }, Math.random() * 100);
    });
  };
}
