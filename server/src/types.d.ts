declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        CURRENT_DB: string;
        COLLECTION_TITLE: string;
        HISTORY_MODULE_STATE: string;
        LOG_LEVEL: string;

        POSTGRES_DATA_VOLUME: string;
        POSTGRES_PORT: string;
        POSTGRES_DB: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_HOST: string;

        MONGO_DATA_VOLUME: string;
        MONGO_PORT: string;
        MONGO_INITDB_ROOT_USERNAME: string;
        MONGO_INITDB_ROOT_PASSWORD: string;
        MONGO_INITDB_DATABASE: string;
        MONGO_HOST: string;

    }
}