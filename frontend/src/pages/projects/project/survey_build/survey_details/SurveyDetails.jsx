// External
import React from "react";
import { SelectField, TextField } from "components/inputs/input_fields";
import { useParams } from "react-router-dom";

// Internal
import { SaveForm } from "components/inputs/SaveForm/SaveForm";
import {
  useFetchProjectGql,
  useUpdateProjectGql,
} from "api/resources/projects/projects";
import { useToken } from "components/Login/Login";

export const SurveyDetails = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProjectGql(id);
  // eslint-disable-next-line
  const updateProjectQuery = useUpdateProjectGql();
  const { token } = useToken();

  // const handleSave = (values) => {
  //   updateProjectQuery.mutate(values);
  // };

  const updateTitle = (newTitle) => {
    updateProjectQuery.mutate({
      id: id,
      input: {
        name: newTitle,
      },
      token: token,
    });
  };

  const updateDescription = (newDesc) => {
    updateProjectQuery.mutate({
      id: id,
      input: {
        description: newDesc,
      },
      token: token,
    });
  };

  const tags = [
    { value: "Product", label: "Product" },
    { value: "Corporate", label: "Corporate" },
    { value: "Service", label: "Service" },
  ];
  const languages = [
    { value: "en", label: "English" },
    { value: "sp", label: "Español" },
    { value: "pt", label: "Português" },
  ];
  const accessGroups = [
    { value: "0", label: "No Jeremy" },
    { value: "1", label: "Don't let Jeremy see this" },
    { value: "2", label: "Confidential: DO NOT SHOW JEREMY" },
  ];

  return (
    <>
      {fetchProjectQuery.isLoading && "Loading..."}
      {fetchProjectQuery.isSuccess && (
        <SaveForm
          fields={[
            {
              label: "Survey Name",
              field: (
                <TextField
                  value={fetchProjectQuery.data.survey.name}
                  placeholder="Survey Name"
                  onSave={updateTitle}
                ></TextField>
              ),
            },
            {
              label: "Description",
              field: (
                <TextField
                  value={fetchProjectQuery.data.survey.description}
                  placeholder="Description"
                  onSave={updateDescription}
                ></TextField>
              ),
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
              field: (
                <SelectField options={languages} selectMultiple></SelectField>
              ),
            },
            {
              label: "Access Groups",
              field: (
                <SelectField
                  options={accessGroups}
                  selectMultiple
                ></SelectField>
              ),
            },
          ]}
        ></SaveForm>
      )}
    </>
  );
};
