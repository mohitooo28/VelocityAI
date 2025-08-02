import React, { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

function VideosTab({ chat }) {
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (index) => {
        setImageErrors((prev) => ({ ...prev, [index]: true }));
    };

    const openVideo = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {chat.video_result?.map((video, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 overflow-hidden hover:shadow-sm"
                        onClick={() => openVideo(video.url)}
                    >
                        <div className="relative overflow-hidden aspect-video bg-gray-100">
                            {!imageErrors[index] ? (
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    onError={() => handleImageError(index)}
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <Play className="h-8 w-8 text-gray-400" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                                <div className="bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Play className="h-4 w-4 text-gray-800 fill-current" />
                                </div>
                            </div>
                        </div>

                        <div className="p-3 space-y-2">
                            <h3 className="font-medium text-gray-900 text-sm leading-5 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                                {video.title}
                            </h3>

                            <div className="flex items-center justify-between text-gray-500 text-xs">
                                <div className="flex items-center min-w-0">
                                    <Image
                                        src="/youtube.svg"
                                        alt="YouTube"
                                        width={16}
                                        height={16}
                                        className="mr-2 flex-shrink-0"
                                    />
                                    <span className="truncate">
                                        {video.creator}
                                    </span>
                                </div>
                                <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!chat.video_result || chat.video_result.length === 0) && (
                <div className="col-span-full text-center py-8">
                    <Play className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                        No videos found for this search.
                    </p>
                </div>
            )}
        </div>
    );
}

export default VideosTab;
