import React from 'react';
import styles from "./FilterMenu.module.scss";


function DropdownMenu() {
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
            <h5>Filters</h5>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Some more stuff</DropdownItem>

        </div>
    );  

}
export default DropdownMenu;