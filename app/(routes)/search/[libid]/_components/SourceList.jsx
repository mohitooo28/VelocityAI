import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

function SourceList({ webResult }) {
    const [visibleSources, setVisibleSources] = useState([]);
    const [hiddenSources, setHiddenSources] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!webResult || webResult.length === 0) {
            setVisibleSources([]);
            setHiddenSources([]);
            return;
        }

        const calculateVisibleSources = () => {
            const containerWidth = containerRef.current?.offsetWidth || 0;
            const sourceWidth = 208; // Corresponds to w-[200px] + p-2 (gap-2)
            const sourcesPerLine = Math.floor(containerWidth / sourceWidth);

            if (webResult.length <= sourcesPerLine) {
                setVisibleSources(webResult);
                setHiddenSources([]);
            } else {
                setVisibleSources(webResult.slice(0, sourcesPerLine - 1));
                setHiddenSources(webResult.slice(sourcesPerLine - 1));
            }
        };

        calculateVisibleSources();
        window.addEventListener("resize", calculateVisibleSources);
        return () =>
            window.removeEventListener("resize", calculateVisibleSources);
    }, [webResult]);

    return (
        <div ref={containerRef} className="flex gap-2 mt-3 mb-5">
            {visibleSources?.map((item, index) => (
                <div
                    key={index}
                    className="p-3 bg-accent rounded-lg w-[200px] cursor-pointer hover:bg-[#e1e3da] flex-shrink-0"
                    onClick={() => window.open(item?.url, "_blank")}
                >
                    <div className="flex gap-2 items-center">
                        <Image
                            src={item.img}
                            alt={item.name}
                            width={20}
                            height={20}
                        />
                        <h2 className="text-xs">{item?.long_name}</h2>
                    </div>
                    <h2 className="line-clamp-2 text-gray-700 text-xs pt-1">
                        {(item?.description)
                            .replaceAll("<strong>", "")
                            .replaceAll("</strong>", "")}
                    </h2>
                </div>
            ))}

            {hiddenSources.length > 0 && (
                <div className="p-3 bg-accent rounded-lg w-[200px] cursor-pointer hover:bg-[#e1e3da] flex-shrink-0">
                    <div className="flex gap-1 items-center mb-2">
                        {hiddenSources.slice(0, 2).map((item, index) => (
                            <Image
                                key={index}
                                src={item.img}
                                alt={item.name}
                                width={16}
                                height={16}
                                className="rounded-sm"
                            />
                        ))}
                    </div>
                    <h2 className="text-xs text-gray-700">
                        + {hiddenSources.length} more sources
                    </h2>
                </div>
            )}
        </div>
    );
}

export default SourceList;
