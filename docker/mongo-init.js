import {configs} from "../server/src/configs";

db.createUser(
    {
        user: configs.MONGO_INITDB_ROOT_USERNAME || 'admin',
        pwd: configs.MONGO_INITDB_ROOT_PASSWORD || 'admin',
        roles: [
            {
                role: 'readWrite',
                db: configs.MONGO_INITDB_DATABASE || 'calculator-app',
            }
        ]
    }
)

