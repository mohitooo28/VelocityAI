import {
    LucideImage,
    LucideList,
    LucideSparkle,
    Send,
    Clipboard,
    LucideVideo,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import AnswerDisplay from "./AnswerDisplay";
import ImageListTab from "./ImageListTab";
import SourceListTab from "./SourceListTab";
import VideosTab from "./VideosTab";
import axios from "axios";
import { supabase } from "@/services/supabase";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const AutoResizeTextarea = ({ placeholder, value, onChange, ...props }) => {
    const maxHeight = 200;
    const textareaRef = useRef(null);

    const handleResize = (element) => {
        if (!element) return;

        element.style.height = "auto";
        const newHeight = element.scrollHeight;

        if (newHeight > maxHeight) {
            element.style.height = maxHeight + "px";
            element.style.overflowY = "auto";
        } else {
            element.style.height = newHeight + "px";
            element.style.overflowY = "hidden";
        }
    };

    const handleInput = (e) => {
        handleResize(e.target);

        if (onChange) {
            onChange(e);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            handleResize(textareaRef.current);
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={value || ""}
            className="w-full p-4 outline-none resize-none min-h-[50px]"
            rows={1}
            style={{
                overflowY: "hidden",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxHeight: maxHeight + "px",
            }}
            onInput={handleInput}
            {...props}
        />
    );
};

const tabs = [
    { label: "Answer", icon: LucideSparkle },
    { label: "Images", icon: LucideImage },
    { label: "Videos", icon: LucideVideo },
    { label: "Sources", icon: LucideList, badge: 10 },
];

function DisplayResult({ searchInputRecord }) {
    const [searchResult, setSearchResult] = useState(searchInputRecord);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [userInput, setUserInput] = useState();
    const { libid } = useParams();
    const pollIntervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (
            searchInputRecord?.Chats?.length === 0 &&
            searchInputRecord?.search_input &&
            !searchResult
        ) {
            getSearchApiResult();
        }

        setSearchResult(searchInputRecord);
    }, [searchInputRecord]);

    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handlePasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setUserInput(clipboardText);
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    };

    const getSearchApiResult = async () => {
        if (loadingSearch) return;

        setLoadingSearch(true);

        try {
            const searchQuery =
                userInput?.trim() || searchInputRecord?.search_input;

            if (!searchQuery) {
                setLoadingSearch(false);
                return;
            }

            const result = await axios.post("/api/brave-search-api", {
                searchInput: searchQuery,
                searchType: searchInputRecord?.type ?? "Search",
            });

            const searchResp = result.data;

            const formattedSearchResp = searchResp?.web?.results?.map(
                (item) => ({
                    title: item?.title,
                    description: item?.description,
                    long_name: item?.profile?.long_name,
                    img: item?.profile?.img,
                    url: item?.url,
                    thumbnail: item.thumbnail?.src,
                })
            );

            // Format video results, filtering only YouTube videos
            const formattedVideoResp =
                searchResp?.videos?.results
                    ?.filter(
                        (video) =>
                            video?.url?.includes("youtube.com") ||
                            video?.url?.includes("youtu.be")
                    )
                    ?.map((video) => ({
                        title: video?.title,
                        url: video?.url,
                        thumbnail: video?.thumbnail?.src,
                        creator: video?.meta_url?.hostname || video?.page_url,
                    })) || [];

            const { data, error } = await supabase
                .from("Chats")
                .insert([
                    {
                        libid: libid,
                        search_result: formattedSearchResp,
                        video_result: formattedVideoResp,
                        user_search_input: searchQuery,
                    },
                ])
                .select();

            if (error) {
                console.error("Database error:", error);
                setLoadingSearch(false);
                return;
            }

            setUserInput("");

            await getSearchRecords();
            await generateAiResponse(
                formattedSearchResp,
                data[0].id,
                searchQuery
            );
        } catch (error) {
            console.error("Search API error:", error);
            setLoadingSearch(false);
        }
    };

    const generateAiResponse = async (
        formattedSearchResp,
        recordId,
        searchQuery
    ) => {
        try {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            const result = await axios.post("/api/llm-model", {
                search_input: searchQuery,
                search_result: formattedSearchResp,
                recordId: recordId,
            });

            const runId = result.data;

            setTimeout(async () => {
                await getSearchRecords();
            }, 15000);

            let pollCount = 0;
            const maxPolls = 30;

            pollIntervalRef.current = setInterval(async () => {
                pollCount++;

                if (pollCount > maxPolls) {
                    clearInterval(pollIntervalRef.current);
                    await getSearchRecords();
                    setLoadingSearch(false);
                    return;
                }

                try {
                    const runResponse = await axios.post(
                        "/api/get-inngest-status",
                        {
                            runId: runId,
                        }
                    );

                    const status =
                        runResponse?.data?.data?.[0]?.status ||
                        runResponse?.data?.status ||
                        "Unknown";

                    if (status === "Completed") {
                        await getSearchRecords();
                        clearInterval(pollIntervalRef.current);
                        setLoadingSearch(false);
                    }
                } catch (error) {
                    console.error(
                        "Polling error (attempt " + pollCount + "):",
                        error.message
                    );
                }
            }, 1000);

            timeoutRef.current = setTimeout(() => {
                clearInterval(pollIntervalRef.current);
                getSearchRecords();
                setLoadingSearch(false);
            }, 120000);
        } catch (error) {
            console.error("Error generating AI response:", error);
            await getSearchRecords();
            setLoadingSearch(false);
        }
    };

    const getSearchRecords = async () => {
        let { data: Library, error } = await supabase
            .from("Library")
            .select("*, Chats(*)")
            .eq("libid", libid)
            .order("id", { foreginTable: "Chats", ascending: true });

        setSearchResult(Library[0]);
    };

    return (
        <div className="mt-8">
            {searchResult?.Chats?.length > 0 ? (
                searchResult.Chats.map((chat, index) => (
                    <ChatSection
                        key={index}
                        chat={chat}
                        loadingSearch={
                            loadingSearch &&
                            index === searchResult.Chats.length - 1
                        }
                    />
                ))
            ) : loadingSearch ||
              (!searchResult && searchInputRecord?.search_input) ? (
                <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mt-8"></div>

                    <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-3">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1"
                            >
                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>

                    <hr className="mt-5" />
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No search results available. Try searching for something
                    above.
                </div>
            )}

            <div className="fixed bottom-0 mb-8 px-4 sm:px-6 lg:px-8 left-0 md:left-[var(--sidebar-width,0rem)] right-0 transition-[left] duration-200 ease-linear">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white w-full border rounded-2xl shadow-md">
                        <div className="flex items-end min-h-[50px]">
                            <div className="flex-1 min-w-0">
                                <AutoResizeTextarea
                                    placeholder="Type anything..."
                                    value={userInput}
                                    onChange={(e) =>
                                        setUserInput(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            !e.shiftKey &&
                                            userInput?.trim()
                                        ) {
                                            e.preventDefault();
                                            getSearchApiResult();
                                        }
                                    }}
                                    disabled={loadingSearch}
                                />
                            </div>
                            <div className="flex-shrink-0 p-2 sm:p-3">
                                <Button
                                    onClick={
                                        userInput?.trim()
                                            ? getSearchApiResult
                                            : handlePasteFromClipboard
                                    }
                                    className="h-8 w-8 sm:h-10 sm:w-10 p-0"
                                    disabled={
                                        loadingSearch ||
                                        (userInput && !userInput.trim())
                                    }
                                >
                                    {!userInput ? (
                                        <Clipboard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    ) : loadingSearch ? (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChatSection({ chat, loadingSearch }) {
    const [activeTab, setActiveTab] = useState("Answer");

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="font-medium text-[28px] line-clamp-2 mt-8 text-gray-800">
                {chat?.user_search_input}
            </h2>

            <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-3">
                {tabs.map(({ label, icon: Icon, badge }) => (
                    <button
                        key={label}
                        onClick={() => setActiveTab(label)}
                        className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
                            activeTab === label ? "text-black" : ""
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                        {badge && (
                            <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                {badge}
                            </span>
                        )}
                        {activeTab === label && (
                            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
                        )}
                    </button>
                ))}
                <div className="ml-auto text-sm text-gray-500">
                    <span className="ml-1">↗</span>
                </div>
            </div>

            <div>
                {activeTab === "Answer" ? (
                    <AnswerDisplay chat={chat} loadingSearch={loadingSearch} />
                ) : activeTab === "Images" ? (
                    <ImageListTab chat={chat} />
                ) : activeTab === "Videos" ? (
                    <VideosTab chat={chat} />
                ) : activeTab === "Sources" ? (
                    <SourceListTab chat={chat} />
                ) : null}
            </div>
            <hr className="mt-5" />
        </div>
    );
}

export default DisplayResult;
