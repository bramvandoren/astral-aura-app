import { gql, useQuery } from "@apollo/client";

export const GET_OPDRACHTEN = gql`
  query GetOpdrachten {
    entries(section: "opdrachten", orderBy: "dateCreated DESC") {
      author {
        id
        fullName
        name
      }
      ... on opdrachten_default_Entry {
        id
        dateCreated
        deadline
        opdrachtStatus
        omschrijving
        categorieen {
          id
          title
        }
      }
      id
      title
    }
  }
`;

export const GET_OPDRACHT = gql`
  query GetOpdracht($opdrachtId: [QueryArgument]) {
    entry(id: $opdrachtId) {
      author {
        id
        fullName
        name
      }
      ... on opdrachten_default_Entry {
        id
        title
        omschrijving
        deadline
        opdrachtStatus
        categorieen {
          id
          title
        }
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
        aanvraagMedium {
          id
          name
        }
      }
    }
  }
`;

export const GET_PERSONAL_OPDRACHTEN = gql`
  query GetPersonalOpdrachten($id: [QueryArgument]) {
    entries(section: "opdrachten", authorId: $id) {
      author {
        id
        fullName
        name
      }
      ... on opdrachten_default_Entry {
        id
        dateCreated
        deadline
        omschrijving
        opdrachtStatus
        categorieen {
          id
          title
        }
      }
      id
      title
      authorId
    }
  }
`;

export const GET_PERSONAL_OPDRACHTEN_MEDIUM = gql`
  query GetPersonalOpdrachtenMedium($id: [QueryArgument]) {
    entries(section: "opdrachten", authorId: $id) {
      author {
        id
        fullName
        name
      }
      ... on opdrachten_default_Entry {
        id
        dateCreated
        deadline
        omschrijving
        opdrachtStatus
        categorieen {
          id
          title
        }
      }
      id
      title
      authorId
    }
  }
`;

export const GET_AANVRAGEN = gql`
  query GetAanvragen($id: [QueryArgument]) {
    entry(section: "opdrachten", id: $id) {
      ... on opdrachten_default_Entry {
        aanvragen {
          ... on aanvragen_aanvraagOpdrachtGebruiker_BlockType {
            id
            prijs
            gebruiker {
              id
              name
            }
          }
        }
      }
    }
  }
`;

// query GetOpdrachtensByUserId {
//   entries(section: "opdrachten", authorId: 98) {
//     authorId
//     title
//     ... on opdrachten_default_Entry {
//       id
//       author {
//         username
//         id
//         name
//       }
//       opdrachtStatus
//       deadline
//       omschrijving
//       categorieen {
//         id
//         title
//       }
//       aanvragen {
//         ... on aanvragen_aanvraagOpdrachtGebruiker_BlockType {
//           id
//           prijs
//           gebruiker {
//             id
//             name
//           }
//         }
//       }
//       aanvraagMedium {
//         name
//         id
//       }
//       plaats
//     }
//   }
// }

export const GET_CATEGORIES = gql`
  query {
    categories {
      title
    }
  }
`;

// Query voor het ophalen van statistieken
export const GET_STATS = gql`
  query GetStats {
    entryCount(section: "opdrachten")
    userCount(group: "Mediums")
  }
`;

// Query voor het ophalen van partners
// export const GET_PARTNERS = gql`
//   query GetPartners {
//     partners {
//       name
//       description
//     }
//   }
// `;

// Query voor het ophalen van getuigenissen
// export const GET_TESTIMONIALS = gql`
//   query GetTestimonials {
//     testimonials {
//       author
//       content
//     }
//   }
// `;

// Query voor het ophalen van informatie over het uitzendbureau
export const GET_ABOUT_US = gql`
  query AboutUs {
    entries(section: "contactpage") {
      title
    }
  }
`;

// Query voor het ophalen van widgets / content blocks
// export const GET_WIDGETS = gql`
//   query GetWidgets {
//     widgets {
//       title
//       content
//     }
//   }
// `;

// Query voor het ophalen van user info
export const GET_USER_PROFILE = gql`
  query GET_USER_PROFILE($id: [QueryArgument]) {
    user(id: $id) {
      ... on User {
        id
        email
        fullName
        gsm
        name
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

// Query voor het ophalen van de mediums
export const GET_MEDIUMS = gql`
  query MyQuery {
    users(group: "Mediums") {
      id
      name
      email
      photo {
        url
      }
      ... on User {
        id
        email
        categorieen {
          title
          id
        }
      }
    }
  }
`;
