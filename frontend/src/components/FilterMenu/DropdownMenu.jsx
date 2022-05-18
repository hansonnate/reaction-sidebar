import React from 'react';
import styles from "./FilterMenu.module.scss";


function DropdownMenu(props) {
    // const [open, setOpen] = useState(false);
    function DropdownItem(props) {
        return (
            <a href="#" className={styles.menuitem}>
                {props.children}
            </a>
        );
    }


    return (
        <div className={styles.dropdown}>
            <div className= {styles.heading}>
                <a><h5>Filters</h5></a>
                <a><span className={styles.saveview}>Save view</span></a>
            </div>
            {props.children}
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Some more stuff</DropdownItem>
            

        </div>
    );  

}
export default DropdownMenu;