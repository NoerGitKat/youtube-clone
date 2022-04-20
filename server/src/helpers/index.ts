export function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
  if (Array.isArray(property)) {
    Object.entries(property).filter((prop) => {
      const [key] = prop;

      return !property.includes(key as keyof T);
    });
  }

  const { [property]: unused, ...rest } = obj;

  return rest;
}
