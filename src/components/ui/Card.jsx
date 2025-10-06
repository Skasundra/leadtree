import { cn } from "../../utils/cn";

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border border-border-light dark:border-border-dark bg-background-light-card dark:bg-background-dark-card text-text-primary-light dark:text-text-primary-dark shadow-sm",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-text-secondary-light dark:text-text-secondary-dark", className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);