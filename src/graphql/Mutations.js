import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateOpdrachtgever($naam: String, $email: String, $gsm: String) {
    updateViewer(fullName: $naam, email: $email, gsm: $gsm) {
      ... on User {
        id
      }
    }
  }
`;

// Opdracht aanmaken met :  Vraag, Omschrijving, Plaats, Tijdstip/Deadline
export const CREATE_OPDRACHT = gql`
  mutation createOpdracht(
    $authorId: ID
    $title: String
    $omschrijving: String
    $plaats: String
  ) {
    save_opdrachten_default_Entry(
      authorId: $authorId
      title: $title
      omschrijving: $omschrijving
      plaats: $plaats
    ) {
      id
      title
    }
  }
`;
