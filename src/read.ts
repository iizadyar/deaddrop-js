import { getMessagesForUser, userExists } from "./db";
import { authenticate } from "./session";

export async function readMessages(user: string) {
    try {
        if (!await userExists(user)) {
            throw new Error("User does not exist");
        }

        if (!await authenticate(user)) {
            throw new Error("Unable to authenticate");
        }

        getMessagesForUser(user).then((messages) => {
            messages.forEach((e: string) => console.log(e, "\n"));
        });

    } catch (error) {
        console.error("Error occured during reading.", error);
    }
}