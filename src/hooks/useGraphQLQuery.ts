// useGraphQLQuery.ts
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import Logger from 'src/middleware/loggerMiddleware'

interface GraphQLResult {
  data?: Record<string, any>;
  errors?: Array<Error>;
}

function isGraphQLResult(result: any): result is GraphQLResult {
  return result && (result.data || result.errors);
}

//Garantee query not null or undefined
export const useGraphQLQuery = <Variables>(query: string, variables: Variables):
  { data: Record<string, any> | null, error: Error | null } => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = (await API.graphql(graphqlOperation(query, variables))) as GraphQLResult;
        if ('data' in result) {
          setData(result.data || null);
        }
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error(String(err));
        setError(errorInstance);
        Logger.error('Error fetching data', errorInstance);
      }
    };

    fetchData();
  }, [query, variables]);

  return { data, error };
};
