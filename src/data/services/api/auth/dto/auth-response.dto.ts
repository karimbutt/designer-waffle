export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
  };
  token: string;
}
