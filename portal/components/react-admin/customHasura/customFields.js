import { buildFields } from "ra-data-hasura";
import {EXTENDED_TEACHER_RECORD, EXTENDED_SCHOOL_RECORD} from './records';
/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === "teacher") {
    if (["GET_LIST","GET_ONE","UPDATE"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_TEACHER_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if(resourceName === "school") {
    if (["GET_LIST","GET_ONE"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_SCHOOL_RECORD);
      defaultFields.push(...relatedEntities);
    }
  }

  return defaultFields;
};

export default customBuildFields;