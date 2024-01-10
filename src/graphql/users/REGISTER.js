import { gql } from "@apollo/client";

// Mutation to register a new Opdrachtgever user
export const REGISTER_OPDRACHTGEVER = gql`
  mutation RegisterOpdrachtgever(
    $email: String!
    $password: String!
    $naam: String
  ) {
    registerOpdrachtgevers(
      email: $email
      password: $password
      fullName: $naam
    ) {
      jwt
      jwtExpiresAt
      refreshToken
      refreshTokenExpiresAt
      user {
        id
        email
      }
    }
  }
`;

// Mutation to register a new Medium user
export const REGISTER_MEDIUM = gql`
  mutation RegisterMedium($email: String!, $password: String!) {
    registerMediums(email: $email, password: $password) {
      jwt
      jwtExpiresAt
      refreshToken
      refreshTokenExpiresAt
      user {
        id
        email
      }
    }
  }
`;
