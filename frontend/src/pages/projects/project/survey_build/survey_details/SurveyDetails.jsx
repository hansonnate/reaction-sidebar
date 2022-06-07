// External
import React from "react";
import { SelectField, TextField } from "components/inputs/input_fields";
import { useParams } from "react-router-dom";

// Internal
import { SaveForm } from "components/inputs/SaveForm/SaveForm";
import {
  useFetchProject,
  useUpdateProject,
} from "api/resources/projects/projects";

export const SurveyDetails = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProject(id);
  // eslint-disable-next-line
  const updateProjectQuery = useUpdateProject();

  // const handleSave = (values) => {
  //   updateProjectQuery.mutate(values);
  // };

  const updateTitle = (newTitle) => {
    updateProjectQuery.mutate({
      id: id,
      name: newTitle,
    });
  }

  const updateDescription = (newDesc) => {
    updateProjectQuery.mutate({
      id: id,
      description: newDesc,
    });
  }

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
                  value={fetchProjectQuery.data.name}
                  placeholder="Survey Name"
                  onSave={updateTitle}
                ></TextField>
              ),
            },
            {
              label: "Description",
              field: (
                <TextField
                  value={fetchProjectQuery.data.description}
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
