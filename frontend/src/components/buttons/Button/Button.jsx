import React from 'react';
import styles from './Button.module.scss';

export const Button = ({onClick, white, blue, gray, red, width, id, children}) => {
  return <div className={`${(white || blue || gray || red) ? "" : styles.buttonboxblue} ${white && styles.buttonboxwhite} ${blue && styles.buttonboxblue} ${gray && styles.buttonboxgray} ${red && styles.buttonboxred}`} >          
            <button  id={id} onClick={onClick} style={{width: width ? width : "", padding: width ? "" : "0px 20px"}}>
                {children}
            </button>
        </div>
}

export default Button;
