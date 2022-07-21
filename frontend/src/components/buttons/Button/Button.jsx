import React from 'react';
import styles from './Button.module.scss';

export const Button = ({onClick, white, blue, gray, children}) => {
  return <div className={`${styles.buttonboxblue} ${white && styles.buttonboxwhite} ${blue && styles.buttonboxblue} ${gray && styles.buttonboxgray}`}>          
            <button onClick={onClick}>
                {children}
            </button>
        </div>
}

export default Button;
