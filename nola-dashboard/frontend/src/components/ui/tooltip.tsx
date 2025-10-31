import React from 'react';

export const TooltipProvider: React.FC<any> = ({ children }) => <>{children}</>;
export const Tooltip: React.FC<any> = ({ children }) => <span>{children}</span>;

export default TooltipProvider;
