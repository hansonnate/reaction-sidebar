module.exports = {
  projects: [
    {
      id: 0,
      name: "Project 1",
      description: "This is project 1",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "open",
      responses: 200,
      owner: "Mark Wagner"
    },
  ],
  organizations: [
    {
      id: "0684348415",
      name: "Reaction, Inc.",
      display_name: "Reaction"
    },
  ],
  Roles: [
    {
      id: "384650",
      organization_id: "0684348415", 
      name: "Admin",
      description: "Full access",
      permissions: [
        {
          name: "Projects",
          createSurvey: true,
          seeAllSurveys: true,
          sendFromOrgEmail: false,
          sendSurvey: false,
          seeSurveysWhere: false,
          seeSurveyResults: false,
        },
        {
          name: "Contacts",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Organization",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Distribution",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
      ]
    },
    {
      id: "66659702",
      organization_id: "0684348415", 
      name: "Staff",
      description: "Limited access",
      permissions: [
        {
          name: "Projects",
          createSurvey: true,
          seeAllSurveys: true,
          sendFromOrgEmail: false,
          sendSurvey: false,
          seeSurveysWhere: false,
          seeSurveyResults: false,
        },
        {
          name: "Contacts",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Organization",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Distribution",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
      ]
    },
    {
      id: "6480564",
      organization_id: "0684348415", 
      name: "Account Manager",
      description: "Regular access",
      permissions: [
        {
          name: "Projects",
          createSurvey: true,
          seeAllSurveys: true,
          sendFromOrgEmail: false,
          sendSurvey: false,
          seeSurveysWhere: false,
          seeSurveyResults: false,
        },
        {
          name: "Contacts",
          createContactsForTeam: true,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Organization",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
        {
          name: "Distribution",
          createContactsForTeam: false,
          editContacts: false,
          createAudience: false,
        },
      ]
    },
  ]
};
