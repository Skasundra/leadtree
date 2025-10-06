import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Role hierarchy
export const ROLES = {
  SUPER_ADMIN: 'super_admin',    // Level 4 - Full system access
  ADMIN: 'admin',                 // Level 3 - Organization management
  TEAM_MEMBER: 'team_member',     // Level 2 - Own resources
  CLIENT: 'client',               // Level 1 - Limited read access
};

// Permission matrix
export const PERMISSIONS = {
  super_admin: ['*'],  // All permissions
  admin: [
    'leads:read', 'leads:write', 'leads:delete',
    'campaigns:read', 'campaigns:write', 'campaigns:delete',
    'billing:read', 'billing:write',
    'team:read', 'team:write',
  ],
  team_member: [
    'leads:read', 'leads:write',
    'campaigns:read', 'campaigns:write',
  ],
  client: [
    'leads:read',
    'campaigns:read',
  ],
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      loading: false,

      login: async (credentials) => {
        set({ loading: true });
        try {
          // Mock login - replace with actual API call
          const mockUser = {
            id: 1,
            name: 'John Doe',
            email: credentials.email,
            role: ROLES.ADMIN,
            avatar: null,
            company: 'Acme Corp'
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            user: mockUser,
            token: mockToken,
            role: mockUser.role,
            isAuthenticated: true,
            loading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data }
          });
        }
      },

      hasPermission: (permission) => {
        const { role } = get();
        if (!role) return false;
        
        const userPermissions = PERMISSIONS[role] || [];
        return userPermissions.includes('*') || userPermissions.includes(permission);
      },

      hasRole: (requiredRole) => {
        const { role } = get();
        const roleHierarchy = {
          [ROLES.CLIENT]: 1,
          [ROLES.TEAM_MEMBER]: 2,
          [ROLES.ADMIN]: 3,
          [ROLES.SUPER_ADMIN]: 4,
        };
        
        return roleHierarchy[role] >= roleHierarchy[requiredRole];
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);