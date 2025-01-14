'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { SplashScreen } from 'src/components/loading-screen';
import useAuth from 'src/hooks/useAuth';
import { dashboardNavData } from 'src/routes/router';

// ----------------------------------------------------------------------

interface IAuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: IAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLogin, loading, userInfo } = useAuth();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

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
    //redirecting to login if the user is not logged in
    if (!isLogin) {
      const signInPath = paths.auth.signIn;
      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }

    // redirecting to not-authorized page if the user is loggedin but not authorized to access this route
    if (userInfo?.role && !isUserAuthorizedToAccessThisRoute(userInfo.role, pathname)) {
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

const isUserAuthorizedToAccessThisRoute = (role: string, pathname: string) => {
  return dashboardNavData.some((section) => {
    return section.items.some((item) => {
      if (item.path === pathname) {
        return item.allowedRoles.includes(role.toLowerCase());
      }

      // Handle dynamic route match (create/edit)
    const baseHref = pathname.split('/').slice(0, 3).join('/');
    if (item.path.startsWith(baseHref)) {
      return item.allowedRoles.includes(role);
    }
      return false;
    });
  });
};

// const isAuthorizedInDashboardItems = dashboardItems.some((section) => {
//   return section.items.some((item) => {
//     // Handle static route match
//     if (item.href === pathname) {
//       return item.allowedRoles.includes(role);
//     }

//     // Handle dynamic route match (create/edit)
//     const baseHref = pathname.split('/').slice(0, 3).join('/');
//     if (item.href.startsWith(baseHref)) {
//       return item.allowedRoles.includes(role);
//     }

//     return false;
//   });
// });
