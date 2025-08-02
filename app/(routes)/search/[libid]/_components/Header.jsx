import { Button } from "@/components/ui/button";
import { Clock, Link, Send } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";

function Header({ searchInputRecord }) {
    const [showCopiedNotification, setShowCopiedNotification] = useState(false);

    const handleCopyLink = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);

            setShowCopiedNotification(true);

            setTimeout(() => {
                setShowCopiedNotification(false);
            }, 2000);

            console.log("URL copied to clipboard");
        } catch (err) {
            console.error("Failed to copy URL: ", err);
        }
    };

    const handleShare = async () => {
        const currentUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: searchInputRecord?.search_input || "Search Results",
                    text: `Check out this search: ${searchInputRecord?.search_input}`,
                    url: currentUrl,
                });
            } catch (err) {
                console.error("Error sharing: ", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(currentUrl);
                console.log("URL copied to clipboard (share fallback)");
            } catch (err) {
                console.error("Failed to copy URL: ", err);
            }
        }
    };
    return (
        <div className="relative">
            {showCopiedNotification && (
                <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-top duration-200">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <span className="text-sm font-medium">
                        Link copied to clipboard!
                    </span>
                </div>
            )}

            <div className="flex justify-between items-center p-4 border-b mr-5 ml-5">
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <h2 className="text-sm text-gray-500">
                            {moment(searchInputRecord?.created_at).fromNow()}
                        </h2>
                    </div>
                </div>

                <h2 className="line-clamp-1 max-w-md font-semibold text-[16px] truncate">
                    {searchInputRecord?.search_input}
                </h2>

                <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleCopyLink}>
                        <Link />
                    </Button>
                    <Button onClick={handleShare}>
                        <Send /> Share
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
