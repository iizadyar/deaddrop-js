import { connect } from "./db"

export const getMessagesForUser = async (user: string): Promise<string[]> => {
    let db = await connect();

    let messages: string[] = [];

    return messages;
}

export const saveMessage = async (message: string, recipient: string) => {
    let db = await connect();
}