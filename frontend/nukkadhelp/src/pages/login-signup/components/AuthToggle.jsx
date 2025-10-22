import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <Button
        variant={isLogin ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(true)}
        className={`flex-1 ${isLogin ? '' : 'text-muted-foreground'}`}
      >
        Sign In
      </Button>
      <Button
        variant={!isLogin ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(false)}
        className={`flex-1 ${!isLogin ? '' : 'text-muted-foreground'}`}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthToggle;