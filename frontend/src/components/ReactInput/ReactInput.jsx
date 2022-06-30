import React from 'react';
import styles from './ReactInput.module.scss';

function FormInput({name, error, value, onChange, type = "text", placeholder}) {
  return <div>
            <input
                type={type} 
                name={name}
                value={value} 
                onChange={onChange}
                className={styles.formInput}
                placeholder={placeholder}
            />
            {error && <span className='mb-3 text-red-500' >{error}</span>}
        </div>
}

export default FormInput;
