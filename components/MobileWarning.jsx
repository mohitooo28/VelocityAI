"use client";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Monitor, Smartphone, Clock } from "lucide-react";

function MobileWarning() {
    const isMobile = useIsMobile();

    if (!isMobile) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50 p-6">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
                <div className="mb-6">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Monitor className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="text-2xl text-gray-300">→</div>
                        <div className="p-3 bg-gray-100 rounded-full">
                            <Smartphone className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Desktop Experience Only
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        This website is currently optimized for desktop devices
                        only. For the best experience, please visit us on a
                        desktop or laptop computer.
                    </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">
                            Coming Soon
                        </span>
                    </div>
                    <p className="text-blue-800 text-sm">
                        We're working hard to bring you a mobile-friendly
                        experience. Stay tuned for updates!
                    </p>
                </div>
            </div>

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        function updateScreenWidth() {
                            const element = document.getElementById('screen-width');
                            if (element) {
                                element.textContent = window.innerWidth;
                            }
                        }
                        updateScreenWidth();
                        window.addEventListener('resize', updateScreenWidth);
                    `,
                }}
            />
        </div>
    );
}

export default MobileWarning;
