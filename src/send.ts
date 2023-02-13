import readline from "readline";
import { saveMessage, userExists } from "./db";
import{log} from "./index";

export const sendMessage = async (user: string) => {
    try {
        if (!await userExists(user)) {
            throw new Error("Destination user does not exist");
        }

     
     
        //const sender = await getSenderName();
        //const message = await getUserMessage();
       // await saveMessage(message, user, sender);
               
        getUserMessage().then(async (message) => {
            await saveMessage(message, user);
        });
        log("A message was sent to " + user+".")


    } catch (error) {
        log("Message was not sent- " + user +  " does not exist.")
        console.error("Error occured creating a new user.", error);
    }
}

const getUserMessage = async (): Promise<string> => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let message: string = await new Promise(resolve => rl.question("Enter your message: ", resolve));
    rl.close();
    return message;
}


//const getSenderName = async (): Promise<string> => {
   // let rl = readline.createInterface(process.stdin, process.stdout);
   // let sender: string = await new Promise(resolve => rl.question("Enter your name: ", resolve));
   // rl.close();
   // return sender;
//};
