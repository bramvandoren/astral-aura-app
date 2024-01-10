import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
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

export default GET_LOGIN;
