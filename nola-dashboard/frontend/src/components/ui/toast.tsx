import React from 'react';

export const ToastProvider: React.FC<any> = ({ children }) => <>{children}</>;
export const ToastViewport: React.FC<any> = (props) => <div {...props} />;
export const Toast: React.FC<any> = ({ children }) => <div>{children}</div>;
export const ToastClose: React.FC<any> = () => null;
export const ToastTitle: React.FC<any> = ({ children }) => <div className="font-semibold">{children}</div>;
export const ToastDescription: React.FC<any> = ({ children }) => <div>{children}</div>;

export default Toast;
