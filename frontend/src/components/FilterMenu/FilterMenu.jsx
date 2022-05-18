import React, {useState} from 'react';
import styles from "./FilterMenu.module.scss";



function FilterMenu(props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.filtermenu}>
            <a onClick={() => setOpen(!open)}><i className="bi bi-sliders" ></i></a>
            {open && props.children}
        </div>
    );  

}
export default FilterMenu;