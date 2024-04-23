import React from 'react';

export function CreateContext<A>(defaultData: A) {
  type UpdateContext = React.Dispatch<React.SetStateAction<typeof defaultData>>;
  const updateContext: UpdateContext = () => { };

  const ctx = React.createContext({
    state: defaultData,
    updateContext: updateContext
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, updateContext] = React.useState(defaultData);
    return <ctx.Provider value={{ state, updateContext }} {...props} />
  }

  return [ctx, Provider] as const;
}