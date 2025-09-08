export interface Token {
  access_token: string;
  token_type: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
