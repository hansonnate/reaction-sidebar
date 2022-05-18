import React, { useEffect } from "react";
import { Header } from "components/layouts";
import { TextField, SelectField } from "components/inputs";
import { useApi, OrganizationApi } from "api";

export const Help = () => {
  const getOrganizationsApi = useApi(OrganizationApi.getOrganizations);
  const postOrganizationsApi = useApi(OrganizationApi.postOrganization);

  useEffect(() => {
    getOrganizationsApi.request();
  }, []);

  // eslint-disable-next-line
  const handlePostOrg = (orgname, orgdisplayname) => {
    console.log("in handle requeset");
    postOrganizationsApi.request({
      name: orgname,
      display_name: orgdisplayname,
    });
  };

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
      <TextField
        value="One"
        placeholder="Enter text"
        autosave
        disabled
      ></TextField>
      <br />
      <SelectField options={options} selectMultiple></SelectField>
      {getOrganizationsApi.loading && <p>Loading...</p>}
      {getOrganizationsApi.error && <p>{getOrganizationsApi.error}</p>}
      {getOrganizationsApi.data?.map((org) => (
        <div key={org.id}>
          <h2>{org.name}</h2>
          <h3>{org.display_name}</h3>
        </div>
      ))}
      <button onClick={() => handlePostOrg("New Org", "Display name")}>
        post
      </button>
    </>
  );
};
