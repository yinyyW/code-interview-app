export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// export function throttle(func, delay) {

// }
