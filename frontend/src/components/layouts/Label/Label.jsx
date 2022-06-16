import React from 'react'
import styles from "./Label.module.scss"

export const Label = (props) => {
  return (
    <label className={styles.thelabel}>{props.children}</label>
  )
}