import { getMessagesForUser, userExists } from "./db";
import { authenticate } from "./session";
import {log} from "./index";

export async function readMessages(user: string) {
    try {
        if (!await userExists(user)) {
            log(user +" does not exist ");
            throw new Error("User does not exist");
            
        }

        if (!await authenticate(user)) {
            log(user +" Unable to authenticate ");
            throw new Error("Unable to authenticate");
        }

        getMessagesForUser(user).then((messages) => {
            messages.forEach((e: string) => console.log(e, "\n"));
        });
        log(user +" read the message successfully ");
    } catch (error) {
        log(user +" User does exist");
        console.error("Error occured during reading.", error);
    }
}

