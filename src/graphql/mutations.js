/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSongTable = /* GraphQL */ `
  mutation CreateSongTable(
    $input: CreateSongTableInput!
    $condition: ModelSongTableConditionInput
  ) {
    createSongTable(input: $input, condition: $condition) {
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
export const updateSongTable = /* GraphQL */ `
  mutation UpdateSongTable(
    $input: UpdateSongTableInput!
    $condition: ModelSongTableConditionInput
  ) {
    updateSongTable(input: $input, condition: $condition) {
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
export const deleteSongTable = /* GraphQL */ `
  mutation DeleteSongTable(
    $input: DeleteSongTableInput!
    $condition: ModelSongTableConditionInput
  ) {
    deleteSongTable(input: $input, condition: $condition) {
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
