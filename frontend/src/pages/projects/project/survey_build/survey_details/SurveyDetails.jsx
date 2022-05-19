// External
import React from "react";
import { SelectField, TextField } from "components/inputs/input_fields";

// Internal
import { SaveForm } from "components/inputs/SaveForm/SaveForm";

export const SurveyDetails = () => {
  const tags = [
    { value: "Product", label: "Product" },
    { value: "Corporate", label: "Corporate" },
    { value: "Service", label: "Service" }
  ];
  const languages = [
    { value: "en", label: "English" },
    { value: "sp", label: "Español" },
    { value: "pt", label: "Português" }
  ];
  const accessGroups = [
    { value: "0", label: "No Jeremy" },
    { value: "1", label: "Don't let Jeremy see this" },
    { value: "2", label: "Confidential: DO NOT SHOW JEREMY" }
  ];
  const inputs = [
    {
      label: "Survey Name",
      field: <TextField value="Important Survey"></TextField>,
    },
    {
      label: "Description",
      field: <TextField placeholder="Description"></TextField>,
    },
    {
      label: "Tags",
      field: <SelectField options={tags} selectMultiple></SelectField>,
    },
    {
        label: "Default Language",
        field: <SelectField options={languages}></SelectField>,
      },
      {
        label: "Supported Language",
        field: <SelectField options={languages} selectMultiple></SelectField>,
      },
      {
        label: "Access Groups",
        field: <SelectField options={accessGroups} selectMultiple></SelectField>,
      },
      
  ];
  return <SaveForm fields={inputs}></SaveForm>;
};
