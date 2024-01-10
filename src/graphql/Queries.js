import { gql, useQuery } from "@apollo/client";

export const GET_OPDRACHTEN = gql`
  query {
    entries(section: "opdrachten") {
      title
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
  query GET_USER_PROFILE(
    $naam: String
    $email: String
    $gsm: String
  ) { viewer(fullName: $naam, email: $email, gsm: $gsm) {
      ... on User {
        fullName
        email
        gsm
      }
    }
  }
`;


// mutation UpdateOpdrachtgever(
//   $fullName: String
//   $email: String
//   $gsm: String
// ) {
//   updateViewer(fullName: $fullName, email: $email, gsm: $gsm) {
//     ... on User {
//       id
//     }
//   }
// }