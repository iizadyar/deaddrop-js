import { connect } from "./db"

export const userExists = async (user: string): Promise<boolean> => {
    let db = await connect();
    let query = "SELECT id FROM Users WHERE user = :user;"
    
    const result = await db.get(query, {
        ':user': user,
    });

    return result.length >= 0;
}

export const getUserId = async (user: string): Promise<number> => {
    let db = await connect();

    let result = await db.get(`
        SELECT id FROM Users
        WHERE user = :user;
    `, {
        ":user": user,
    });

    return result;
}

export const getUserPassHash = async (user: string): Promise<string> => {
    let db = await connect();

    let result = await db.get(`
        SELECT hash FROM Users
        WHERE user = :user;
    `, {
        ":user": user,
    });
    console.log('result in getUserPassHash', result);

    return result;
}

export const setUserPassHash = async (user: string, hash: string) => {
    let db = await connect();

    console.log('setUserPassHash user:', user);
    await db.run(`
        INSERT INTO Users
            (user, hash)
        VALUES
            (:user, :hash);
    `, {
        ":user": user,
        ":hash": hash,
    });
}

export const noUsers = async (): Promise<boolean> => {
    let db = await connect();
    let result = await db.get("SELECT COUNT(*) FROM Users;");
    return result['COUNT(*)'] === 0;
}