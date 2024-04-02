// useScreenSize.js
import { AlertContext } from 'data/index';
import { useEffect, useContext } from 'react';

const useAlert = () => {
  const { state: alert, updateContext: setAlert} = useContext(AlertContext)

    useEffect(() => {
        if(alert){
            setTimeout(()=>{
                setAlert(undefined)
            }, 3000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

  return {alert, setAlert};
};

export default useAlert;