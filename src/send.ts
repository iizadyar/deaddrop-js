import readline from "readline";
import { saveMessage, userExists } from "./db";
import{log} from "./index";

export const sendMessage = async (user: string) => {
    try {
        if (!await userExists(user)) {
            throw new Error("Destination user does not exist");
        }

        getUserMessage().then(async (message) => {
            await saveMessage(message, user);
        });
        log("message sent successfully to " + user)


    } catch (error) {
        log(user+ "can not send the message becuase user does not exit")
        console.error("Error occured creating a new user.", error);
    }
}

const getUserMessage = async (): Promise<string> => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let message: string = await new Promise(resolve => rl.question("Enter your message: ", resolve));
    rl.close();
    return message;
}
//const getnameofsender =async () :Promise<string> => {
   // let r2 = readline.createInterface(process.stdin,process.stdout);
//let message: string = await new Promise(resolve => r2.question ("enter your name: " , resolve) )
//}