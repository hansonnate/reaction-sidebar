import React, { useState } from "react";
import { TextArea } from "components/inputs/input_fields/TextArea/TextArea";

export const TextQuestion = ({ active }) => {
  const [value, setValue] = useState();

  return <TextArea active={active} value={value} placeholder={`${active ? "Enter placeholder text" : ""}`} onSave={setValue}></TextArea>;
};
