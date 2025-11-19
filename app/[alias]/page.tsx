import {redirect} from "next/navigation";
import {getUrlByAlias} from "@/lib/urlRepo";

interface PageProps {
    params: {alias: string};
}

export default async function AliasPage({params}: PageProps) {
    const doc = await getUrlByAlias(params.alias);

    if(!doc) {
        redirect("/")
    }

    redirect(doc.url);
}