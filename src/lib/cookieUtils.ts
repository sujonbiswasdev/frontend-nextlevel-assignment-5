"use server";

import { cookies } from "next/headers";

export const setCookie = async (
    name : string,
    value : string,
    maxAgeInSeconds : number,
) => {
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set(name, value, {
        httpOnly : true,
        // External payment redirects can land on our app via cross-site navigation.
        // `strict` blocks cookies in that case; `lax` allows them on top-level GET navigations.
        sameSite : "lax",
        // Avoid breaking local/dev over HTTP.
        secure : isProduction,
        path : "/",
        maxAge : maxAgeInSeconds,
    })
}
export const getCookie = async (name : string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}


export const deleteCookie = async (name : string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
}