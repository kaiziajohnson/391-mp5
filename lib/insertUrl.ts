"use server";


import getCollection, { URLS_COLLECTION } from "@/db";

type Params = { url: string; alias: string };

function isValidUrl(url: string): boolean {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

export default async function insertUrl({ url, alias }: Params): Promise<string> {

    if (!isValidUrl(url)) {
        return "Please enter a valid URL (must start with http or https).";
    }

    const col = await getCollection(URLS_COLLECTION);


    const existing = await col.findOne({ alias });
    if (existing) {
        return "That alias is already taken.";
    }

    try {
        await col.insertOne({
            alias,
            url,
            time: new Date().toISOString(),
        });
    } catch (err) {
        console.error(err);
        return "Database error. Try again later.";
    }


    return "";
}