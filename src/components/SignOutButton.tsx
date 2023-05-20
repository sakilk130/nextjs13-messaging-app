'use client';

import React, { ButtonHTMLAttributes, FC, useCallback, useState } from 'react';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Loader2, LogOut } from 'lucide-react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      toast.error('There was an error signing out. Please try again later.');
    } finally {
      setIsSigningOut(false);
    }
  }, [setIsSigningOut]);

  return (
    <Button {...props} variant="ghost" onClick={handleSignOut}>
      {isSigningOut ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
