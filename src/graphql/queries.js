/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSongTable = /* GraphQL */ `
  query GetSongTable($id: ID!) {
    getSongTable(id: $id) {
      id
      title
      description
      filePath
      like
      author
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSongTables = /* GraphQL */ `
  query ListSongTables(
    $filter: ModelSongTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        like
        author
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
