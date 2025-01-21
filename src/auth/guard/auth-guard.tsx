'use client';

import React, { useCallback, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { dashboardNavData } from 'src/routes/router';

import useAuth from 'src/hooks/useAuth';

import { SplashScreen } from 'src/components/loading-screen';
import { isValidToken } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

interface IAuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: IAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo, logout } = useAuth();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const role = userInfo.role && userInfo?.role.toLowerCase();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    //if the token is not valid call logout
    if (!isValidToken(userInfo?.token)) {
      logout();
      return;
    }

    // redirecting to login if the user is not logged in
    if (!isLogin) {
      const signInPath = paths.auth.signIn;
      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }

    // redirecting to not-authorized page if the user is loggedin but not authorized to access this route
    if (role && !isUserAuthorizedToAccessThisRoute(role, pathname)) {
      router.replace(paths.notAuthorized);
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, loading, pathname]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

const isUserAuthorizedToAccessThisRoute = (role: string | null, pathname: string) => {
  // Check if the pathname exists in nav item
  const isPathDefinedInNavData = dashboardNavData.some((section) =>
    section.items.some((item: any) => {
      if (item.path === pathname) {
        return true;
      }

      const baseHref = pathname.split('/').slice(0, 3).join('/');
      if (item.path.startsWith(baseHref)) {
        return true;
      }

      if (item.children) {
        return item.children.some((nestedItem: any) => {
          if (nestedItem.path === pathname) {
            return true;
          }
          if (nestedItem.path.startsWith(baseHref)) {
            return true;
          }
          return false;
        });
      }

      return false;
    })
  );

  // If the path is not found in the nav items, allow access
  if (!isPathDefinedInNavData) {
    return true;
  }

  // if path is defined then check allowed roles
  return dashboardNavData.some((section) =>
    section.items.some((item: any) => {
      if (
        item.path === pathname ||
        item.path.startsWith(pathname.split('/').slice(0, 3).join('/'))
      ) {
        return item.allowedRoles.includes(role);
      }
      if (item.children) {
        return item.children.some((nestedItem: any) => {
          if (
            nestedItem.path === pathname ||
            nestedItem.path.startsWith(pathname.split('/').slice(0, 3).join('/'))
          ) {
            return nestedItem.allowedRoles.includes(role);
          }
          return false;
        });
      }

      return false;
    })
  );
};
