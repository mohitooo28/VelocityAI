import Image from "next/image";
import React from "react";

function SourceListTab({ chat }) {
    return (
        <div className="space-y-4 mt-6">
            {chat.search_result.map((item, index) => (
                <div
                    key={index}
                    className="group p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    onClick={() => window.open(item?.url, "_blank")}
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-400 bg-gray-50 rounded-full w-6 h-6 flex items-center justify-center">
                                {index + 1}
                            </span>
                            <Image
                                src={item.img}
                                alt={item.name}
                                width={20}
                                height={20}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                                {item?.title}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                {item?.long_name}
                            </p>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                {(item?.description)
                                    .replaceAll("<strong>", "")
                                    .replaceAll("</strong>", "")}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SourceListTab;
