import { AuthService } from './auth.service';

export function initializeAppFactory(authService: AuthService): () => void {
  return () => {
    if (authService.hasAccessToken) {
      authService.getUserInfo().subscribe();
    }
  };
}
