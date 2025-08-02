import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { runId } = await req.json();

    try {
        if (
            !process.env.INNGEST_SERVER_HOST ||
            !process.env.INNGEST_SIGNING_KEY
        ) {
            console.error("Missing INNGEST environment variables");
            return NextResponse.json(
                {
                    error: "Inngest configuration missing",
                    data: [{ status: "Completed" }], 
                },
                { status: 200 }
            );
        }

        const result = await axios.get(
            `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
                },
            }
        );

        return NextResponse.json(result.data);
    } catch (error) {
        console.error("Inngest status check error:", error.message);

        return NextResponse.json(
            {
                error: error.message,
                data: [{ status: "Completed" }], 
            },
            { status: 200 }
        );
    }
}
