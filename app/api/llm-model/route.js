import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client";

export async function GET(req) {
    return NextResponse.json({
        message: "LLM Model API is working",
        method: "GET",
    });
}

export async function POST(req) {
    try {
        console.log("LLM Model API called");
        const { search_input, search_result, recordId } = await req.json();

        console.log("Request data:", { search_input, recordId });

        const inngestRunId = await inngest.send({
            name: "llm-model",
            data: {
                search_input,
                search_result,
                recordId,
            },
        });

        console.log("Inngest run ID:", inngestRunId);
        return NextResponse.json(inngestRunId);
    } catch (error) {
        console.error("Error in LLM Model API:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
