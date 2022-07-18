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
      responses: 3,
      owner: "Mark Wagner",
      default_language: "en",
      supported_languages: ["en", "sp"],
      accessgroup_ids: ["552224"],
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
      accessgroup_ids: ["552224"],
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
      accessgroup_ids: ["552224"],
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
      accessgroup_ids: ["552224"],
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
      create_project: true,
      see_all_projects: true,
      send_from_org_email: true,
      send_survey: true,
      see_surveys_where: true,
      see_survey_results: true,
      create_contacts_for_team: true,
      edit_contacts: true,
      create_audience: true,
      can_edit_user_groups: true,
      can_edit_users: true,
      can_see_users: true,
      can_create_user: true,
      can_see_distribution_settings: true,
      can_edit_org_details: true,
      can_edit_distribution_settings: true,
    },
    {
      id: "66659702",
      organization_id: "0684348415",
      name: "Staff",
      description: "Limited access",
      create_project: true,
      see_all_projects: true,
      send_from_org_email: false,
      send_survey: false,
      see_surveys_where: false,
      see_survey_results: false,
      create_contacts_for_team: false,
      edit_contacts: false,
      create_audience: false,
      can_edit_user_groups: false,
      can_edit_users: false,
      can_see_users: false,
      can_create_user: false,
      can_see_distribution_settings: false,
      can_edit_org_details: false,
      can_edit_distribution_settings: false,
    },
    {
      id: "6480564",
      organization_id: "0684348415",
      name: "Account Manager",
      description: "Regular access",
      create_project: true,
      see_all_projects: true,
      send_from_org_email: false,
      send_survey: false,
      see_surveys_where: false,
      see_survey_results: false,
      create_contacts_for_team: false,
      edit_contacts: false,
      create_audience: false,
      can_edit_user_groups: false,
      can_edit_users: false,
      can_see_users: false,
      can_create_user: false,
      can_see_distribution_settings: false,
      can_edit_org_details: false,
      can_edit_distribution_settings: false,
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
          id: "563",
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
          id: "564",
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
      id: "563",
      role_id: "66659702",
      organization_id: "0684348415",
      firstname: "Mohema",
      lastname: "Dsquarious",
      email: "mohemad@email.com",
      position: "Janitor",
      company: "Peer60",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      last_sign_in_at: "2020-01-01",
    },
    {
      id: "564",
      role_id: "384650",
      organization_id: "0684348415",
      firstname: "Beast",
      lastname: "Mode",
      email: "marshawn@email.com",
      position: "YourNightmare",
      company: "Seahawks",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      last_sign_in_at: "2020-01-01",
    },
    {
      id: "565",
      role_id: "384650",
      organization_id: "0684348415",
      firstname: "Nathaniel",
      lastname: "Hanson",
      email: "Nathanson@email.com",
      position: "Inter",
      company: "ReactionData",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      last_sign_in_at: "2020-01-01",
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
      strength: "Bad",
    },
    {
      id: 1,
      project_id: 0,
      subject: "More Opinion",
      audience_id: 0,
      from: "jbikman@reaction.com",
      status: "Draft",
      date: null,
      strength: "Good",
    },
  ],
  audiences: [
    {
      id: 0,
      name: "Patients",
      description: "Only Patients",
      members: 350,
      contact_ids: [
        0, 1, 2
      ],
      created_at: "2020-01-01",
      modified_at: "2020-01-01",
    },
  ],
  questions: [
    {
      id: 0,
      project_id: 0,
      type: "NumberScale",
      page_order_index: 2,
      page_number: 1,
      is_hidden: false,
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      description: "This is a scale question",
      name: "On a scale of 1-5 how much do you like bananas?",
      instructions: "1=Yuck; 5=Yay!",
      isMultiSelect: null,
      otherOption: null,
      otherOptionText: null,
      question_type_config: {
        scale_question: {
          min: 1,
          max: 5,
          min_description: "Yuck",
          max_description: "Yum",
        },
      },
    },
    {
      id: 1,
      project_id: 0,
      type: "MultipleChoice",
      page_order_index: 1,
      page_number: 2,
      is_hidden: false,
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      description: "This is a choice question",
      name: "What is your favorite color?",
      instructions: "Choose Multiple",
      isMultiSelect: true,
      otherOption: true,
      otherOptionText: "Other Juan",
      question_type_config: {
        choice_question: {
          isMultiSelect: false,
          isRandomized: false,
          hasOtherOption: true,
          otherOptionText: "No Pill",
          choices: [
            "Red",
            "Blue",
            "Green",
            "Yellow",
            "Black",
            "Very dark grey",
          ],
        },
      },
    },
    {
      id: 2,
      project_id: 0,
      type: "Text",
      page_order_index: 1,
      page_number: 1,
      is_hidden: false,
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      description: "This is a text question",
      name: "What is your favorite color?",
      instructions: "Enter text",
      isMultiSelect: null,
      otherOption: null,
      otherOptionText: null,
      question_type_config: {
        text_question: {
          max_length: 255,
          placeholder: "Enter your favorite color",
        },
      },
    },
  ],
  choices: [
    {
      id: "524",
      question_id: 1,
      choice_value: "Red",
    },
    {
      id: "525",
      question_id: 1,
      choice_value: "Blue",
    },
    {
      id: "526",
      question_id: 1,
      choice_value: "Green",
    },
    {
      id: "527",
      question_id: 1,
      choice_value: "Yellow",
    },
    {
      id: "528",
      question_id: 1,
      choice_value: "Black",
    },
    {
      id: "529",
      question_id: 1,
      choice_value: "Very dark grey",
    },
  ],
  contacts: [
    {
      id: 0,
      organization_id: "0684348415",
      survey_participation_count: 3,
      survey_completion_count: 3,
      survey_noncompletion_count: 0,
      last_surveyed_at: "2020-01-01",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      prefix: null,
      first_name: "Nathaniel",
      middle_name: "Lee",
      last_name: "Hanson",
      email: "nhanson@reactiondata.com",
      gender: "male",
      locale: "en",
      company: "ReactionData",
      position: "Web Developer",
      position_category: "Staff",
      date_of_birth: "06/20/1992",
      last_survey_completed: "Project 1",
      last_survey_invitation: "2020-01-01",
    },
    {
      id: 1,
      organization_id: "0684348415",
      survey_participation_count: 3,
      survey_completion_count: 3,
      survey_noncompletion_count: 0,
      last_surveyed_at: "2020-01-01",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      prefix: null,
      first_name: "Kennith",
      middle_name: "",
      last_name: "Beach",
      email: "k_beach@urmom.com",
      gender: "male",
      locale: "en",
      company: "FortWorth",
      position: "CEO",
      position_category: "CEO",
      date_of_birth: "06/20/1992",
      last_survey_completed: "Project 1",
      last_survey_invitation: "2020-01-01",
    },
    {
      id: 2,
      organization_id: "0684348415",
      survey_participation_count: 3,
      survey_completion_count: 3,
      survey_noncompletion_count: 0,
      last_surveyed_at: "2020-01-01",
      created_at: "2020-01-01",
      updated_at: "2020-01-01",
      prefix: null,
      first_name: "Brenda",
      middle_name: "",
      last_name: "Hammbone",
      email: "brendabone@getouttahere.net",
      gender: "female",
      locale: "en",
      company: "GetOut .inc",
      position: "Cheif Medical Officer",
      position_category: "CMO",
      date_of_birth: "06/20/1992",
      last_survey_completed: "Project 1",
      last_survey_invitation: "2020-01-01",
    },
  ],
  answers: [
    {
      id: 0,
      contact_id: 0,
      question_id: 0,
      answer_type: "NumberScale",
      text_value: null,
      boolean_value: null,
      array_value: null,
      decimal_value: 5,
    },
    {
      id: 1,
      contact_id: 0,
      question_id: 1,
      answer_type: "MultipleChoice",
      text_value: null,
      boolean_value: null,
      array_value: ["Red"],
      decimal_value: null,
    },
    {
      id: 1,
      contact_id: 1,
      question_id: 1,
      answer_type: "MultipleChoice",
      text_value: null,
      boolean_value: null,
      array_value: ["Blue"],
      decimal_value: null,
    },
    {
      id: 1,
      contact_id: 2,
      question_id: 1,
      answer_type: "MultipleChoice",
      text_value: null,
      boolean_value: null,
      array_value: ["Black"],
      decimal_value: null,
    },
  ],
  visualizations: [
    {
      id: "123",
      project_id: 0,
      question_id: 1,
      type: "horizontalbarchart",
      total: 3,
      index: 0,
      title: "What is your favorite color?",
      titleLabel: "What is your favorite color?",
      selected: false,
      design_settings: {
        hasDataLabels: true,
        dataLabelFontSize: 12,
        dataLabelPosition: "center",
        dataLabelAlignment: "center",
        dataLabelSigFig: 1,
        dataLabelPercentages: true,
        hasTitle: true,
        titleLabel: "What is your favorite color?",
        titleFontSize: 12,
        titleAlignment: "center",
        hasLegend: true,
        legendPosition: "bottom",
        legendFontSize: 12,
        legendPointStyle: true,
      },
      data: null,
    },
  ],
};
