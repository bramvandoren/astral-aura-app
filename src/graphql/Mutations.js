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
    $title: String!
    $omschrijving: String!
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

// Aanvraag gebruiiker voor opdracht te behanndelen
export const AANVRAAG_USER = gql`
  mutation aanvraag($missionId: ID!, $aanvragen: [Int]) {
    save_opdrachten_default_Entry(
      id: $opdrachtId
      aanvragen: $aanvragen
      opdrachtStatus: "pending"
    ) {
      id
      ... on opdrachten_default_Entry {
        title
        opdrachtStatus
        aanvragen {
          ... on aanvragen_aanvraagOpdrachtGebruiker_BlockType {
            id
            gebruiker {
              id
              name
            }
            prijs
          }
        }
      }
    }
  }
`;

// export const DELETE_SPECIALTY = gql`
//   mutation DeleteSpecialty($userId: ID!, $specialtyId: ID!) {
//     deleteCategory(userId: $userId, Id: $specialtyId) {
//       id
//       name
//     }
//   }
// `;

export const DELETE_SPECIALTY_PROFILE = gql`
  mutation DeleteSpecialtyProfile($userId: ID!, $categorieId: ID!) {
    updateViewer(userId: $userId, id: $categorieId) {
      ... on User {
        id
        categorieen {
          ... on categorieen_Category {
            id
            title
          }
        }
      }
    }
  }
`;

export const ADD_SPECIALTY_PROFILE = gql`
  mutation AddSpecialtyProfile(
    $categorieId: [QueryArgument]
    $categoryTitle: [String]
  ) {
    updateViewer {
      ... on User {
        categorieen(title: $categoryTitle, id: $categorieId) {
          ... on categorieen_Category {
            id
            title
          }
        }
      }
    }
  }
`;

// export const UPDATE_USER_PROFILE = gql`
//   mutation UpdateOpdrachtgever($naam: String, $email: String, $gsm: String) {
//     updateViewer(fullName: $naam, email: $email, gsm: $gsm) {
//       ... on User {
//         id
//       }
//     }
//   }
// `;
