/// <reference types="vite/client" />

interface ImportMetaEnv {
    // API Configuration
    readonly VITE_API_BASE_URL: string;

    // Voice AI Services
    readonly VITE_VOICE_SERVICE_URL: string;
    readonly VITE_LLM_SERVICE_URL: string;

    // Authentication
    readonly VITE_JWT_SECRET_KEY: string;
    readonly VITE_SESSION_TIMEOUT: string;

    // File Upload
    readonly VITE_MAX_FILE_SIZE_MB: string;
    readonly VITE_ALLOWED_FILE_TYPES: string;

    // Real-time Features
    readonly VITE_WEBSOCKET_URL: string;
    readonly VITE_ENABLE_REAL_TIME: string;

    // Analytics & Monitoring
    readonly VITE_ANALYTICS_ENABLED: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_HOTJAR_ID: string;

    // Development
    readonly VITE_ENABLE_DEV_TOOLS: string;
    readonly VITE_MOCK_API: string;

    // Company & Whitelabel
    readonly VITE_DEFAULT_COMPANY_NAME: string;
    readonly VITE_DEFAULT_THEME_COLOR: string;
    readonly VITE_ENABLE_WHITELABEL: string;

    // External Integrations
    readonly VITE_TWILIO_ACCOUNT_SID: string;
    readonly VITE_TWILIO_AUTH_TOKEN: string;
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_GOOGLE_CLOUD_PROJECT: string;

    // Security
    readonly VITE_ENABLE_2FA: string;
    readonly VITE_PASSWORD_MIN_LENGTH: string;
    readonly VITE_SESSION_SECURE: string;

    // Features Flags
    readonly VITE_ENABLE_BULK_OPERATIONS: string;
    readonly VITE_ENABLE_ADVANCED_ANALYTICS: string;
    readonly VITE_ENABLE_EXPORT_DATA: string;
    readonly VITE_ENABLE_CONVERSATION_RECORDING: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
