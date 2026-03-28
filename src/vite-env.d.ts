/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface Window {
        researchWorkspaceRefresh?: () => void;
        setResearchSubtab?: (key: string) => void;
        RESEARCH_ENTRIES?: Record<string, unknown[]>;
    }
}

export {};
