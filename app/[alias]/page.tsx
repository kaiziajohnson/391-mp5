import { redirect } from "next/navigation";
import getUrl from "@/lib/getUrl";


export default async function RedirectPage(props: { params: Promise<{ alias: string }> }) {
    const { alias } = await props.params;

    const url = await getUrl(alias);

    if (!url) redirect("/");

    redirect(url);
}
