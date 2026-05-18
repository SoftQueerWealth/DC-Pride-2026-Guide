/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_ID?: string;
  readonly VITE_GOOGLE_SHEETS_API_KEY?: string;
  readonly VITE_PUBLIC_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
