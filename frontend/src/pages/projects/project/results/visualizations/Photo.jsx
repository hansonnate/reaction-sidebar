import React, {forwardRef} from 'react';
/* eslint-disable */
export const Photo = forwardRef(({url, index, faded, style, numParticipants, ...props}, ref) => {
  const inlineStyles = {
    opacity: faded ? '0.2' : '1',
    transformOrigin: '0 0',
    height: index === 0 ? 410 : 200,
    gridRowStart: index === 0 ? 'span 2' : null,
    gridColumnStart: index === 0 ? 'span 2' : null,
    backgroundImage: `url("${url.url}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'grey',
    ...style,
  };

  return <div ref={ref} style={inlineStyles} {...props} >{numParticipants}hey</div>;
});
