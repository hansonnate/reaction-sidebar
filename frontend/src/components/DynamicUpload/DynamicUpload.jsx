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

  return (
    <div className={styles.page}>
      <Label>Rules</Label>
      {/* <table>
        {rules.map((i) => (
          <tr key={i}>
            <td>
              <SelectField></SelectField>
            </td>
            <td>
              <SelectField></SelectField>
            </td>
            <td>
              <TextField placeholder="Type..."></TextField>
            </td>
          </tr>
        ))}
      </table> */}

      <div className={styles.rules}>
        <SelectField></SelectField>
        <SelectField></SelectField>
        <TextField placeholder="Type..."></TextField>
      </div>
      <button > + New Rule</button>
    </div>
  );
};
