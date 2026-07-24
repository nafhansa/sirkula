declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_APP_URL: string;
    readonly NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_WS_URL: string;
    readonly NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    readonly NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
    readonly API_SECRET_KEY: string;
    readonly CLOUDINARY_API_KEY: string;
    readonly CLOUDINARY_API_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;
  }
}
