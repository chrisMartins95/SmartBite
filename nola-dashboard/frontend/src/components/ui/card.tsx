import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={"rounded-xl border bg-card border-card-border text-card-foreground shadow-sm " + (className || '')} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={("flex flex-col space-y-1.5 p-6 " + (className || ''))} {...props}>{children}</div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={("p-4 " + (className || ''))} {...props}>{children}</div>
);

export default Card;
