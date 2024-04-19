// Path: client/src/hooks/__tests__/useAuth.test.ts
import axios from '../axiosConfig';
import useAuth from './useAuth'

// Mock axios module
jest.mock('../axiosConfig', () => ({
    ...jest.requireActual('../axiosConfig'), // Keep the actual implementation
    get: jest.fn(),
  }));

  describe('useAuth', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

test('fetches user when token exists in localStorage', async () => {
        const userResponse = {
          data: {
            user: { /* mock user data */ }
     }
 };

 // Mock localStorage.getItem to return a token
jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('mockToken');

// Mock axios.get to return userResponse when called with the correct arguments
axios.get = jest.fn().mockResolvedValue(userResponse);

const { result, waitForNextUpdate } = renderHook(() => useAuth());

// Wait for the hook to finish fetching user
await waitForNextUpdate();

 expect(result.current.user).toEqual(userResponse.data.user);
  });

test('useAuth', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAuth());

  // Simulate a token refresh from useRefreshToken
    await result.current.refresh();

  // Wait for the hook to re-render with updated values
  await waitForNextUpdate();

  // Assert that the user's authentication status has been updated
  expect(result.current.user).not.toBeNull(); // Assuming user is updated after refresh
});
function renderHook(arg0: () => { user: import("../../types/index.ts").IUser | null; isUserLoading: boolean; refresh: () => Promise<any>; }): { result: any; waitForNextUpdate: any; } {
    // implement the renderHook function
    return { result: null, waitForNextUpdate: null };
}
});