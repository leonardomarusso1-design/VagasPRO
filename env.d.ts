declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GEMINI_API_KEY?: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY?: string;
    STRIPE_SECRET_KEY?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    NEXTAUTH_URL?: string;
    NEXTAUTH_SECRET?: string;
    [key: string]: string | undefined;
  }
}
