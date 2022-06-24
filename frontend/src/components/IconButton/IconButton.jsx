import React from 'react'
import styles from './IconButton.module.scss'

export const IconButton = ({children, onClick}) => {
  return (
    <button className={styles.button} onClick={onClick}>
        {children}
    </button>
  )
}
