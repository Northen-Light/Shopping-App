import { createContext, useContext } from 'react';

export function createSafeContext(name) {
  const context = createContext(null);
  context.displayName = name;

  const useSafeContext = () => {
    const value = useContext(context);
    if (!value) {
      throw new Error(`use${name} should be used within use${name}Provider`);
    }
    return value;
  };
  return [context, useSafeContext];
}
