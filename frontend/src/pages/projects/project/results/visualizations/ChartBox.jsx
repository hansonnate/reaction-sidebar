import React, {forwardRef} from 'react';
/* eslint-disable */
export const ChartBox = forwardRef(({item, index, faded, style, ...props}, ref) => {
  const inlineStyles = {
    opacity: faded ? '0.2' : '1',
    transformOrigin: '0 0',
    height: index === 0 ? 510 : 250,
    gridRowStart: index === 0 ? 'span 2' : null,
    gridColumnStart: index === 0 ? 'span 2' : null,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'white',
    border: '2px solid #EFEFEF',
    borderRadius: '5px',
    overflow: 'hidden',
    ...style,
  };

  return <div ref={ref} style={inlineStyles} {...props} >{item.data}</div>;
});
