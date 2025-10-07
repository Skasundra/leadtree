import { useAuth } from "../../context/AuthContext.jsx";

export const RoleGuard = ({ children, allowedRoles, fallback = null }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">
              Access Denied
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              You don't have permission to access this resource.
            </p>
          </div>
        </div>
      )
    );
  }

  return children;
};
