export interface AuthServiceContract {
  login(credentials: { email: string; password: string }): Promise<{ token: string }>
  logout(userId: string): Promise<void>
  refreshToken(userId: string): Promise<string>
  resetPassword(email: string): Promise<void>
}
