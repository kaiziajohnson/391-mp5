"use server";

import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getUrl(alias: string): Promise<string | null> {
    if (!alias) return null;

    const col = await getCollection(URLS_COLLECTION);
    const doc = await col.findOne({ alias });

    if (!doc) return null;

    return doc.url;
}

