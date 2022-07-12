module.exports = {
  projects: [
    {
      id: 0,
      organization_id: "0684348415",
      name: "Project 1",
      description: "This is project 1",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "Open",
      responses: 200,
      owner: "Mark Wagner",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"]
    },
    {
      id: 1,
      organization_id: "0684348415",
      name: "Project 2",
      description: "This is project 2",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "Open",
      responses: 200,
      owner: "Mark Wagner",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"]
    },
    {
      id: 2,
      organization_id: "0684348415",
      name: "Project 3",
      description: "This is project 3",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "Closed",
      responses: 200,
      owner: "Mark Wagner",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"]
    },
    {
      id: 3,
      organization_id: "0684348415",
      name: "Project 4",
      description: "This is project 4",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      status: "Open",
      responses: 200,
      owner: "Mark Wagner",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"]
    },
  ],
  organizations: [
    {
      id: "0684348415",
      name: "Reaction, Inc.",
      display_name: "Reaction",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
    },
  ],
  roles: [
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
      ],
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
      ],
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
      ],
    },
  ],
  accessgroups: [
    {
      id: "552224",
      organization_id: "0684348415",
      name: "No Jeremy",
      description: "Exclude Jeremy",
      whitelist_user_ids: [
        {
          id: 0,
          organization_id: "0684348415",
          firstname: "Mohema",
          lastname: "Dsquarious",
          email: "mohemad@email.com",
          position: "Janitor",
          company: "Peer60",
          created_at: "2020-01-01",
          updated_at: "2020-01-01",
        },
      ],
      blacklist_user_ids: [
        {
          id: 1,
          organization_id: "0684348415",
          firstname: "Beast",
          lastname: "Mode",
          email: "marshawn@email.com",
          position: "YourNightmare",
          company: "Seahawks",
          created_at: "2020-01-01",
          updated_at: "2020-01-01",
        },
      ],
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
    },
  ],
  users: [
    {
      id: 0,
      organization_id: "0684348415",
      firstname: "Mohema",
      lastname: "Dsquarious",
      email: "mohemad@email.com",
      position: "Janitor",
      company: "Peer60",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
    },
    {
      id: 1,
      organization_id: "0684348415",
      firstname: "Beast",
      lastname: "Mode",
      email: "marshawn@email.com",
      position: "YourNightmare",
      company: "Seahawks",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
    },
  ],
  emails: [
    {
      id: 0,
      project_id: 0,
      subject: "Opinion",
      audience_id: 0,
      from: "jbikman@reaction.com",
      status: "Delivered",
      date: "2020-01-01",
      strength: "Bad"
    },
    {
      id: 1, 
      project_id: 0,
      subject: "More Opinion",
      audience_id: 0,
      from: "jbikman@reaction.com",
      status: "Draft",
      date: null,
      strength: "Good"
    }
  ],
  audiences: [
    {
      id: 0,
      name: "Patients",
      members: 350,
      created: "2020-01-01",
      modified: "2020-01-01"
    },

  ] 
};
