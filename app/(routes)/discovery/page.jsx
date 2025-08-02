"use client";
import { SEARCH_RESULT } from "@/services/Shared";
import {
    Compass,
    Cpu,
    DollarSign,
    Dribbble,
    Globe,
    Palette,
    Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./_components/NewsCard";

const options = [
    {
        title: "Top",
        icon: Star,
    },
    {
        title: "Tech & Science",
        icon: Cpu,
    },
    {
        title: "Finance",
        icon: DollarSign,
    },
    {
        title: "Art & Culture",
        icon: Palette,
    },
    {
        title: "Sports",
        icon: Dribbble,
    },
];

function Discovery() {
    const [selectedOption, setSelectedOption] = useState("Top");
    const [latestNews, setLatestNews] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        selectedOption && getSearchResult();
    }, [selectedOption]);

    const getSearchResult = async () => {
        setLoading(true);
        const result = await axios.post("/api/brave-search-api", {
            searchInput: selectedOption + "Latest News & Updates",
            searchType: "Search",
        });

        const webSearchResult = result?.data?.web?.results;
        setLatestNews(webSearchResult);
        setLoading(false);
    };

    const renderNewsGrid = () => {
        if (!latestNews || latestNews.length === 0) return null;

        const limitedNews = latestNews.slice(0, 8);
        const gridItems = [];
        let currentIndex = 0;

        while (currentIndex < limitedNews.length) {
            gridItems.push(
                <div key={`row-${currentIndex}`} className="grid gap-6">
                    <div className="col-span-1">
                        <NewsCard
                            news={limitedNews[currentIndex]}
                            variant="medium"
                        />
                    </div>
                </div>
            );
            currentIndex++;

            if (currentIndex < limitedNews.length) {
                const nextThree = limitedNews.slice(
                    currentIndex,
                    currentIndex + 3
                );
                gridItems.push(
                    <div
                        key={`row-${currentIndex}-triple`}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {nextThree.map((news, idx) => (
                            <NewsCard
                                key={currentIndex + idx}
                                news={news}
                                variant="small"
                            />
                        ))}
                    </div>
                );
                currentIndex += 3;
            }
        }

        return gridItems;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="pt-20 pb-12 px-6 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Compass className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                Discover
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Stay updated with the latest news and trends
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 p-2 bg-gray-100 rounded-2xl">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedOption(option.title)}
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl transition-all duration-300 ${
                                    selectedOption === option.title
                                        ? "bg-white text-primary shadow-md font-semibold"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                                }`}
                            >
                                <option.icon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    {option.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
                            <div className="aspect-[2/1] bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse"
                                >
                                    <div className="aspect-video bg-gray-200 rounded-xl mb-3"></div>
                                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
                            <div className="aspect-[2/1] bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={`second-${index}`}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse"
                                >
                                    <div className="aspect-video bg-gray-200 rounded-xl mb-3"></div>
                                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
                            <div className="aspect-[2/1] bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                ) : latestNews && latestNews.length > 0 ? (
                    <div className="space-y-8">{renderNewsGrid()}</div>
                ) : (
                    <div className="text-center py-16">
                        <div className="p-4 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <Globe className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No news found
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Try selecting a different category to see the latest
                            updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Discovery;
