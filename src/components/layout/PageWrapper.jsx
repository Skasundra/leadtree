import { cn } from "../../utils/cn";

export const PageWrapper = ({
  children,
  className,
  title,
  description,
  actions,
}) => {
  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      <div className="p-4 lg:p-6">
        {(title || description || actions) && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {title && (
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-2">{actions}</div>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
