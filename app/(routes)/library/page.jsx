"use client";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import {
    SquareArrowOutUpRightIcon,
    Search,
    Clock,
    GalleryHorizontalEnd,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Library() {
    const { user } = useUser();
    const [libraryHistory, setLibraryHistory] = useState();
    const [loading, setLoading] = useState(true);
    const [navigating, setNavigating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        user && getLibraryHistory();
    }, [user]);

    const getLibraryHistory = async () => {
        setLoading(true);
        let { data: Library, error } = await supabase
            .from("Library")
            .select("*")
            .eq("user_email", user?.primaryEmailAddress?.emailAddress)
            .order("id", { ascending: false });

        setLibraryHistory(Library);
        setLoading(false);
    };

    const handleNavigation = (libid) => {
        setNavigating(true);
        router.push("/search/" + libid);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="pt-20 pb-12 px-6 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        {" "}
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <GalleryHorizontalEnd className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                Search Library
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Your search history and saved results
                            </p>
                        </div>
                    </div>
                    {libraryHistory?.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>
                                {libraryHistory.length} search
                                {libraryHistory.length !== 1 ? "es" : ""} found
                            </span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="p-2 bg-gray-200 rounded-xl w-9 h-9"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : libraryHistory?.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <Search className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No searches yet
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Start exploring by making your first search. Your
                            search history will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {libraryHistory?.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                onClick={() => handleNavigation(item.libid)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
                                            <Search className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                                                {item.search_input}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="h-3 w-3 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    {moment(
                                                        item.created_at
                                                    ).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <SquareArrowOutUpRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {navigating && (
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
        </div>
    );
}

export default Library;
