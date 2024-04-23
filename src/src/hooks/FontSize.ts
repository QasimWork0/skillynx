import { TextSizeContext } from 'data/index';
import { TextSizes } from 'entities/constants';
import { useContext } from 'react';

const useFontSize = () => {
    const { state: textSize } = useContext(TextSizeContext)

  return TextSizes[textSize];
};

export default useFontSize;