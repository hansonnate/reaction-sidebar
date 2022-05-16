import React from "react";
import { Header } from "components/layouts";
import { TextField, SelectField } from "components/inputs";

export const Help = () => {
  const options = [
    {
      value: "1",
      label: "One",
    },
    {
      value: "2",
      label: "Two",
    },
    {
      value: "3",
      label: "Three",
    },
  ];
  return (
    <>
      <Header title="Help" />
      <div>help</div>
      <TextField value="One" placeholder="Enter text" autosave disabled></TextField>
      <br />
      <SelectField options={options} selectMultiple></SelectField>
    </>
  );
};
