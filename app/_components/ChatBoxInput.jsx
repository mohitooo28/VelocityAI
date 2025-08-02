"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Atom,
    ChevronRight,
    Clipboard,
    Cpu,
    Paperclip,
    SearchCheck,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { AIModelsOptions } from "@/services/Shared";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

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

    // Resize when value changes (e.g., when pasted programmatically)
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
            className="w-full p-4 outline-none resize-none min-h-[50px] custom-scrollbar"
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

function ChatBoxInput() {
    const [userSearchInput, setUserSearchInput] = useState();
    const [searchType, setSearchType] = useState("search");
    const [loading, setLoading] = useState(false);
    const { user, isSignedIn } = useUser();

    const router = useRouter();

    const onSearchQuery = async () => {
        if (!isSignedIn || !user) {
            alert("You must be signed in to search.");
            return;
        }
        setLoading(true);
        const libid = uuidv4();

        try {
            const { data } = await supabase
                .from("Library")
                .insert([
                    {
                        libid: libid,
                        search_input: userSearchInput,
                        user_email: user?.primaryEmailAddress?.emailAddress,
                        type: searchType,
                    },
                ])
                .select();

            console.log(data[0]);

            router.push(`/search/${libid}`);
        } catch (error) {
            console.error("Error creating search:", error);
            alert("Failed to create search. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setUserSearchInput(clipboardText);
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    };
    return (
        <div className="flex h-screen items-center flex-col justify-center w-full">
            {loading && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    <div className="rounded-lg p-4 flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                        <p className="text-xs text-gray-600">Loading</p>
                    </div>
                </div>
            )}
            <Image
                src={"/title.svg"}
                alt="logo"
                width={220}
                height={140}
                style={{
                    width: "220px",
                    height: "auto",
                }}
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (userSearchInput) {
                        onSearchQuery();
                    }
                }}
                className="mt-10 p-2 w-full max-w-2xl border rounded-2xl"
            >
                <div className="flex flex-col">
                    <Tabs defaultValue="search" className="w-full">
                        <TabsContent value="search" className="w-full">
                            <AutoResizeTextarea
                                placeholder="Ask Anything"
                                value={userSearchInput}
                                onChange={(e) =>
                                    setUserSearchInput(e.target.value)
                                }
                            />
                        </TabsContent>
                        <TabsContent value="research" className="w-full">
                            <AutoResizeTextarea
                                placeholder="Research Anything"
                                value={userSearchInput}
                                onChange={(e) =>
                                    setUserSearchInput(e.target.value)
                                }
                            />
                        </TabsContent>
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger
                                    value="search"
                                    className={"text-primary"}
                                    onClick={() => setSearchType("search")}
                                >
                                    <SearchCheck /> Search
                                </TabsTrigger>
                                <TabsTrigger
                                    value="research"
                                    className={"text-primary"}
                                    onClick={() => setSearchType("research")}
                                >
                                    <Atom /> Research
                                </TabsTrigger>
                            </TabsList>
                            <div className="flex gap-3 items-center flex-shrink-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">
                                            <Cpu className="text-gray-500 h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            Models
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {AIModelsOptions.map(
                                            (module, index) => (
                                                <DropdownMenuItem key={index}>
                                                    <div className="mb-1">
                                                        <h2 className="text-s">
                                                            {module.name}
                                                        </h2>
                                                        <p className="text-[12px] text-gray-400">
                                                            {module.desc}
                                                        </p>
                                                    </div>
                                                </DropdownMenuItem>
                                            )
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="ghost">
                                    <Paperclip className="text-gray-500 h-5 w-5" />
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={(e) => {
                                        if (!userSearchInput) {
                                            e.preventDefault();
                                            handlePasteFromClipboard();
                                        }
                                    }}
                                    disabled={loading}
                                    className={loading ? "bg-gray-600" : ""}
                                >
                                    {!userSearchInput ? (
                                        <Clipboard className="h-5 w-5 text-white" />
                                    ) : (
                                        <ChevronRight className="text-white h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </form>
        </div>
    );
}

export default ChatBoxInput;
