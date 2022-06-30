import React from 'react';
import styles from './Button.module.scss';

export const Button = ({onClick, white, children}) => {
  return <div className={`${white ? styles.buttonboxwhite : styles.buttonboxorange}`}>          
            <button onClick={onClick}>
                {children}
            </button>
        </div>
}

export default Button;
