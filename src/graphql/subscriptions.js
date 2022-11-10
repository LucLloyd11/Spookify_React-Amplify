/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSongTable = /* GraphQL */ `
  subscription OnCreateSongTable(
    $filter: ModelSubscriptionSongTableFilterInput
    $owner: String
  ) {
    onCreateSongTable(filter: $filter, owner: $owner) {
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
export const onUpdateSongTable = /* GraphQL */ `
  subscription OnUpdateSongTable(
    $filter: ModelSubscriptionSongTableFilterInput
    $owner: String
  ) {
    onUpdateSongTable(filter: $filter, owner: $owner) {
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
export const onDeleteSongTable = /* GraphQL */ `
  subscription OnDeleteSongTable(
    $filter: ModelSubscriptionSongTableFilterInput
    $owner: String
  ) {
    onDeleteSongTable(filter: $filter, owner: $owner) {
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
