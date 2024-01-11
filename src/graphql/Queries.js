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
  query GET_USER_PROFILE{
    viewer{
      ... on User {
        id
        fullName
        email
        gsm
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
  }
}
`;
