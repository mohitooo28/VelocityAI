import React, { useState } from "react";
import { ExternalLink, Clock, Image as ImageIcon } from "lucide-react";

function NewsCard({ news, variant = "small" }) {
    const isLarge = variant === "large";
    const isMedium = variant === "medium";
    const [imageError, setImageError] = useState(false);
    const hasImage = news?.thumbnail?.original && !imageError;

    return (
        <div
            className={`group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isLarge ? "p-6" : isMedium ? "p-5" : "p-4"
            }`}
            onClick={() => window.open(news?.url, "_blank")}
        >
            <div
                className={`overflow-hidden rounded-xl mb-4 ${
                    isLarge
                        ? "aspect-video"
                        : isMedium
                        ? "aspect-[2/1]"
                        : "aspect-video"
                }`}
            >
                {hasImage ? (
                    <img
                        src={news?.thumbnail?.original}
                        alt={news?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                        <ImageIcon
                            className={`text-gray-400 ${
                                isLarge
                                    ? "h-16 w-16"
                                    : isMedium
                                    ? "h-14 w-14"
                                    : "h-12 w-12"
                            }`}
                        />
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <h2
                    className={`font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 ${
                        isLarge
                            ? "text-xl lg:text-2xl"
                            : isMedium
                            ? "text-lg lg:text-xl"
                            : "text-lg"
                    }`}
                >
                    {news?.title}
                </h2>

                {news?.description && (
                    <p
                        className={`text-gray-600 line-clamp-3 ${
                            isLarge
                                ? "text-base"
                                : isMedium
                                ? "text-sm lg:text-base"
                                : "text-sm"
                        }`}
                    >
                        {news?.description
                            ?.replaceAll("<strong>", "")
                            .replaceAll("</strong>", "")}
                    </p>
                )}

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                            {news?.age || "Recently"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Read more</span>
                        <ExternalLink className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
