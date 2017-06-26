/* @flow */

import {
  Kind,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLScalarType,
} from 'graphql';

import { getTopic } from './githubdata/topic.js';
import { getUniformResourceLocatable } from "./githubdata/uniformResourceLocatable";
import { getRepositoryOwner } from "./githubdata/repositoryOwner";

// Github Scalar Types

export const uriType = new GraphQLScalarType({
  name: 'URI',
  description:
    'An RFC 3986, RFC 3987, and RFC 6570 (level 4) compliant URI string.',
  serialize: String,
  parseValue: String,
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? ast.value : null;
  }
});

// Start Interfaces in order of when they were implemented

const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'A node in the Github hierarchy',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the node.',
    },
  }),
  resolveType(node) {
    if (node.type === 'Topic') {
      return topicType;
    }
  }
});

const repositoryOwnerInterface = new GraphQLInterfaceType({
  name: 'RepositoryOwnerInterface',
  description: 'Represents an owner of a Repository.',
  fields: () => ({
    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username used to login.',
    },
  }),
  resolveType(repositoryOwner) {
    if (repositoryOwner.type === 'RepositoryOwner') {
      return repositoryOwnerType;
    }
  }
});

// End Interfaces

// Start Type Implementations

const uniformResourceLocatableType = new GraphQLObjectType({
  name: 'UniformResourceLocatable',
  description: 'Represents a type that can be retrieved by a URL.',
  fields: () => ({
    resourcePath: {
      type: new GraphQLNonNull(uriType),
      description: 'The HTML path to this resource.',
    },
    url: {
      type: new GraphQLNonNull(uriType),
      description: 'The HTML path to this resource.',
    },
  }),
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
    relatedTopics: {
      type: new GraphQLList(topicType),
      description:
        'A list of related topics.',
    },
  }),
  interfaces: [ nodeInterface ]
});

const repositoryOwnerType = new GraphQLObjectType({
  name: 'RepositoryOwner',
  description: 'Represents an owner of a Repository.',
  fields: () => ({
    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username used to login.',
    },
  }),
  interfaces: [ repositoryOwnerInterface ]
});

// End Type Implementations

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

    resource: {
      type: uniformResourceLocatableType,
      args: {
        url: {
          description: 'a URI String',
          type: new GraphQLNonNull(uriType)
        },
      },
      resolve: (root, { url }) => getUniformResourceLocatable(url),
    },

    repositoryOwner: {
      type: repositoryOwnerType,
      args: {
        login: {
          description: 'The username used to login.',
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (root, { login }) => getRepositoryOwner(login),
    },
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */

export const GithubSchema = new GraphQLSchema({
  query: queryType,
  types: [ topicType, uniformResourceLocatableType, repositoryOwnerType ]
});
