import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { searchInput, searchType } = await req.json();

        if (!searchInput) {
            return NextResponse.json(
                { error: "Please pass user search query" },
                { status: 400 }
            );
        }

        const result = await axios.get(
            "https://api.search.brave.com/res/v1/web/search?q=" +
                encodeURIComponent(searchInput) +
                "&count=10&country=in&search_lang=en&result_filter=web,videos",
            {
                headers: {
                    Accept: "application/json",
                    "Accept-Encoding": "gzip",
                    "X-Subscription-Token": process.env.BRAVE_API_KEY,
                },
            }
        );

        return NextResponse.json(result.data);
    } catch (error) {
        console.error("Brave API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch search results", details: error.message },
            { status: 500 }
        );
    }
}
