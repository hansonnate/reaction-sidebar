import { SelectField, TextField } from "components/inputs";
import { Label } from "components/layouts/Label/Label";
import React from "react";
import styles from "./DynamicUpload.module.scss";
export const DynamicUpload = () => {
//   const [rules, setRules] = useState([
//     {
//       type: "PM",
//       condition: "Equals",
//       value: "",
//     },
//   ]);

//   const addRule = () => {
//     let array = rules;
//     const newRule = {
//       type: "PM",
//       condition: "Equals",
//       value: "",
//     };
//     array.push(newRule);
//     setRules(array);
//   };

const filterTypes = [
  {
    value: 'equals', label: 'Equals'
  },
  {
    value: 'doesnotequal', label: 'Does Not Equal'
  },
  {
    value: 'contains', label: 'Contains'
  },
  {
    value: 'doesnotcontain', label: 'Does Not Contain'
  },
]

const filterConditions = [
  {
    value: 'first_name', label: 'First Name'
  },
  {
    value: 'last_name', label: 'Last Name'
  },
  {
    value: 'email', label: 'Email'
  },
  {
    value: 'position', label: 'Position'
  },
  {
    value: 'company', label: 'Company'
  },
]
  return (
    <div className={styles.page}>
      <Label>Rules</Label>

      <div className={styles.rules}>
        <SelectField options={filterConditions}></SelectField>
        <SelectField options={filterTypes}></SelectField>
        <TextField placeholder="Type..."></TextField>
      </div>
      <button > + New Rule</button>
    </div>
  );
};
