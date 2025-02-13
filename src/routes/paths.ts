// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  faqs: '/faqs',
  contact: '/contact',
  notAuthorized: '/not-authorized',
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,

    // will be removed
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    analytics: `${ROOTS.DASHBOARD}/analytics`,

    profile: `${ROOTS.DASHBOARD}/profile`,
    myAccount: `${ROOTS.DASHBOARD}/profile/my-account`,

    property: `${ROOTS.DASHBOARD}/property`,
    add_property: `${ROOTS.DASHBOARD}/property/add`,
    edit_property: (customerId: string) => `${ROOTS.DASHBOARD}/property/${customerId}`,

    blog: `${ROOTS.DASHBOARD}/blog`,
    add_blog: `${ROOTS.DASHBOARD}/blog/add`,
    edit_blog: (blogId: string) => `${ROOTS.DASHBOARD}/blog/${blogId}`,

    feature_and_tag: `${ROOTS.DASHBOARD}/feature-and-tag`,

    user: `${ROOTS.DASHBOARD}/user`,

    security: `${ROOTS.DASHBOARD}/profile/security`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    users: `${ROOTS.DASHBOARD}/users`,

    // will be removed
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
};
