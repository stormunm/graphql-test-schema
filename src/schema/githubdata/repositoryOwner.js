/**
* given a login string return the repositoryOwner
*
*{
* repositoryOwner(login: "stormasm") {
*    id
*    login
*    resourcePath
*    repository(name: "plum") {
*      id
*      nameWithOwner
*      description
*      diskUsage
*      isFork
*    }
*  }
*}
*/

const RepositoryOwnerMap = {
  stormasm: {
    id: "MDQ6VXNlcjE4MDk5OTE=",
    login: "stormasm",
    resourcePath: "/stormasm"
  },
  "dgraph-io": {
    id: "MDEyOk9yZ2FuaXphdGlvbjEzOTU4NzA2",
    login: "dgraph-io",
    resourcePath: "/dgraph-io"
  },
  graphql: {
    id: "MDEyOk9yZ2FuaXphdGlvbjEyOTcyMDA2",
    login: "graphql",
    resourcePath: "/graphql"
  }
};

export default RepositoryOwnerMap;
