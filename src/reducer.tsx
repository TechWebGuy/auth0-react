import { AuthState, User } from './auth-state';

type Action =
  | { type: 'LOGIN_POPUP_STARTED' }
  | {
      type: 'INITIALISED' | 'LOGIN_POPUP_COMPLETE' | 'USER_UPDATED';
      user?: User;
    }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: Error };

/**
 * Handles how that state changes in the `useAuth0` hook.
 */
export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_POPUP_STARTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_POPUP_COMPLETE':
    case 'INITIALISED':
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
        isLoading: false,
        error: undefined,
      };
    case 'USER_UPDATED':
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};
