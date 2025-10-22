import React from 'react';
import Button from '../../../components/ui/Button';

const RoleToggle = ({ userRole, onRoleChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-3">
        I am a:
      </label>
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          variant={userRole === 'customer' ? "default" : "ghost"}
          size="sm"
          onClick={() => onRoleChange('customer')}
          className={`flex-1 ${userRole === 'customer' ? '' : 'text-muted-foreground'}`}
        >
          Customer
        </Button>
        <Button
          variant={userRole === 'provider' ? "default" : "ghost"}
          size="sm"
          onClick={() => onRoleChange('provider')}
          className={`flex-1 ${userRole === 'provider' ? '' : 'text-muted-foreground'}`}
        >
          Service Provider
        </Button>
      </div>
    </div>
  );
};

export default RoleToggle;