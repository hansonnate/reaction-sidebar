import React from "react";
import styles from "./FilterMenu.module.scss";
import Select from "react-select";
import Accordion from "../../components/Accordion/Accordion.jsx";

function DropdownMenu(props) {
  // const [open, setOpen] = useState(false);
//   function DropdownItem(props) {
//     return (
//       <a href="#" className={styles.menuitem}>
//         {props.children}
//       </a>
//     );
//   }
  const isDisabled = false;
  const isLoading = false;
  const isSearchable = true;
  const isClearable = true;
  const isRtl = false;
  const options = [
    { value: 'view1', label: 'View 1' },
    { value: 'view2', label: 'View 2' },
    { value: 'view3', label: 'View 3' }
  ]
//   const AccordionData = [
//       {
//           title: "Owner",
//           content: "a;lkfdja;ldsjf;lasjdf;lasjdf;laskjdf;lasjdf;lskaj",
//           id: 1
//       },
//       {
//         title: "Date",
//         content: "a;lkfdja;ldsjf;lasjdf;lasjdf;laskjdf;lasjdf;lskaj",
//         id: 2
//     },
//     {
//         title: "Status",
//         content: "a;lkfdja;ldsjf;lasjdf;lasjdf;laskjdf;lasjdf;lskaj",
//         id: 3
//     },
//   ]

  return (
    <div className={styles.dropdown}>
      <div className={styles.heading}>
        <span className={styles.header}>Filters</span>
        <span className={styles.saveview}>Save view</span>
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
      />
      
      {/* {props.children} */}
      {/* {console.log(props.children)} */}
      {/* <DropdownItem>My Profile</DropdownItem>
      <DropdownItem>Some more stuff</DropdownItem> */}
      {/* {console.log(data)} */}
      <Accordion>{props.children}</Accordion>
    </div>
  );
}
export default DropdownMenu;
