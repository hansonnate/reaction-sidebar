import React from 'react';
import styles from "./ActionButton.module.scss"

function ActionButton({title, functionality, body}) {


  return <div className={styles.mainbutton}>          
            <button onClick={functionality} >
                {title}
                {body}
            </button>
        </div>
}

export default ActionButton;
