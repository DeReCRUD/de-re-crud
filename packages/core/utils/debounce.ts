// https://john-dugan.com/javascript-debounce/

export default function debounce(
  // tslint:disable-next-line:ban-types
  func: Function,
  wait: number = 200,
  immediate: boolean = false
// tslint:disable-next-line:ban-types
): Function {
  let timeoutId;

  return function() {
    const args = arguments;

    const debouncedFunc = () => {
      timeoutId = null;

      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(debouncedFunc, wait || 200);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
