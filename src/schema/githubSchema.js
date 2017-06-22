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

const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'A node in the Github hierarchy',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the node.',
    },
  }),
  resolveType(character) {
    if (character.type === 'Topic') {
      return topicType;
    }
  }
});

const topicType = new GraphQLObjectType({
  name: 'Topic',
  description: 'A Topic in the Github world.',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the topic.',
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the topic.',
    },
  }),
  interfaces: [ nodeInterface ]
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
