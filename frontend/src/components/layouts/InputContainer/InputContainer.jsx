import React from 'react'
import styles from "./InputContainer.module.scss"

export const InputContainer = (props) => {
  return (
    <div className={styles.container}>{props.children}</div>
  )
}