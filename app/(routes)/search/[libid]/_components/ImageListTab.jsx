import Image from "next/image";
import React, { useState } from "react";

function ImageListTab({ chat }) {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    const filteredImages =
        chat.search_result?.filter(
            (item) => item?.thumbnail && item.thumbnail.trim() !== ""
        ) || [];

    return (
        <div className="mt-8">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4">
                {filteredImages.map((item, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid mb-4 group cursor-pointer"
                        onClick={() => window.open(item.url, "_blank")}
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                            {!loadedImages[index] && (
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                                    <div className="w-12 h-12 text-gray-400">
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                            <Image
                                src={item?.thumbnail}
                                alt={item.title || "Search result image"}
                                width={600}
                                height={450}
                                className={`w-full h-auto object-cover group-hover:scale-110 transition-all duration-500 ease-out ${
                                    loadedImages[index]
                                        ? "opacity-100"
                                        : "opacity-0 absolute inset-0"
                                }`}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                onLoad={() => handleImageLoad(index)}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                            {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white text-sm font-semibold line-clamp-3 leading-relaxed">
                                        {item.title}
                                    </p>
                                    {item.url && (
                                        <p className="text-gray-300 text-xs mt-1 truncate">
                                            {new URL(item.url).hostname}
                                        </p>
                                    )}
                                </div>
                            )}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageListTab;
