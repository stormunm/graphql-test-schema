/* @flow */

import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import { getTopic } from './githubdata/topic.js';

const topicType = new GraphQLObjectType({
  name: 'Topic',
  description: 'A Topic in the Github world.',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the topic.',
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    topic: {
      type: topicType,
      args: {
        name: {
          description: 'name of the topic',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { name }) => getTopic(name),
    },
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */

export const GithubSchema = new GraphQLSchema({
  query: queryType,
  types: [ topicType ]
});
