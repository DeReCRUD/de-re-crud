function assignDefaults<T>(dest: Partial<T>, src: Partial<T>) {
  Object.keys(src).forEach((key) => {
    if (!(key in dest)) {
      dest[key] = src[key];
    }
  });
}

export default function defaults<T>(
  dest: Partial<T>,
  src: Partial<T>,
  ...otherSrcs: Array<Partial<T>>
): Partial<T> {
  const newDest = { ...(dest as object) } as Partial<T>;

  assignDefaults(newDest, src);

  otherSrcs.forEach((otherSrc) => {
    assignDefaults(newDest, otherSrc);
  });

  return newDest;
}
