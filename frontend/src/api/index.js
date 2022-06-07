/************ API SERVICE FUNCTION ************/
export { useApi } from "./Api";

/*************** AVAILABLE APIS ***************/
// Organizations
export { default as OrganizationApi } from "./resources/organization";
export { default as ContactsApi } from "./resources/contacts";
export { default as AudiencesApi } from "./resources/audiences";

// Projects
// export { default as ProjectsApi } from "./resources/projects/projects";
// export { default as QuestionsApi } from "./resources/projects/questions";
// export { default as ResultsApi } from "./resources/projects/results";
// export { default as DeliveriesApi } from "./resources/projects/deliveries";
// export { default as ParticipationsApi } from "./resources/projects/participations";
// export { default as DistributionsApi } from "./resources/projects/distributions";
