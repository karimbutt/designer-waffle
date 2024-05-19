import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Assuming you are using React Router for navigation

interface LinkProps {
  to: string; // Destination URL or route path
  children: React.ReactNode; // Link text or content
  className?: string; // Optional for additional styling
}

const Link = ({ to, children, className }: LinkProps) => {
  return (
    <RouterLink
      to={to}
      className={`font-medium text-accent-200 hover:text-accent-100 ${className}`}>
      {children}
    </RouterLink>
  );
};

export default Link;
