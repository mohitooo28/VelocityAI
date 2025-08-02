import { supabase } from "@/services/supabase";
import { inngest } from "./client";

export const llmModel = inngest.createFunction(
    { id: "llm-model" },
    { event: "llm-model" },
    async ({ event, step }) => {
        console.log("Starting LLM Model function with data:", event.data);

        const aiResponse = await step.ai.infer("generate-ai-llm-model-call", {
            model: step.ai.models.gemini({
                model: "gemini-1.5-flash",
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
            }),
            body: {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `Based on the following search results, provide a comprehensive summary and analysis in markdown format.

User Query: ${event.data.search_input}

Search Results:
${JSON.stringify(event.data.search_result, null, 2)}

Please provide a well-structured response with:
1. A clear summary of the topic
2. Key insights from the search results
3. Relevant details organized with proper headings
4. Use markdown formatting for better readability`,
                            },
                        ],
                    },
                ],
            },
        });

        console.log("AI Response received:", aiResponse);

        const saveToDb = await step.run("saveToDb", async () => {
            try {
                const responseText =
                    aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!responseText) {
                    throw new Error("No response text received from AI");
                }

                const { data, error } = await supabase
                    .from("Chats")
                    .update({
                        ai_response: responseText,
                    })
                    .eq("id", event.data.recordId)
                    .select();

                if (error) {
                    console.error("Database update error:", error);
                    throw new Error(
                        `Failed to save to database: ${error.message}`
                    );
                }

                console.log("Successfully saved to database:", data);
                return data;
            } catch (dbError) {
                console.error("Error in saveToDb step:", dbError);
                throw dbError;
            }
        });
        return {
            success: true,
            aiResponse: aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text,
            dbResult: saveToDb,
        };
    }
);
