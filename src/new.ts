import readline from "readline";

import { noUsers, setUserPassHash, userExists } from "./db";
import { authenticate, getPassword } from "./session";

export const newUser = async (user: string) => {
    try {
        console.log("newUser", "user", user);
        if (!noUsers() && !userExists(user)) {
            throw new Error("User not recognized");
        }

        console.log('recognized user', user);
        if (!(await authenticate(user))) {
            throw new Error("Unable to authenticate user");
        }

        console.log('authenticated user', user);
        let newUser = getNewUsername();
        let newPassHash = await getPassword();

        await setUserPassHash(newUser, newPassHash);

    } catch (error) {
        console.error("Error ocurred creating a new user.", error);
    }
}

const getNewUsername = (): string => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let username = "";
    rl.question("Username: ", (answer) => {
        username = answer;
    });
    return username;
}