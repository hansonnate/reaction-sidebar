import React from "react";
import styles from "./FilterMenu.module.scss";
// import Accordion from "../../components/Accordion/Accordion.jsx";

function DropdownMenu(props) {
  // const [open, setOpen] = useState(false);
  //   function DropdownItem(props) {
  //     return (
  //       <a href="#" className={styles.menuitem}>
  //         {props.children}
  //       </a>
  //     );
  //   }
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


      {/* {props.children} */}
      {/* {console.log(props.children)} */}
      {/* <DropdownItem>My Profile</DropdownItem>
      <DropdownItem>Some more stuff</DropdownItem> */}
      {/* {console.log(data)} */}
      {props.children}
    </div>
  );
}
export default DropdownMenu;
