import React from "react";
import Markdown from "react-markdown";

function DisplaySummary({ ai_response }) {
    return (
        <div className="max-w-4xl mx-auto">
            {!ai_response ? (
                <div className="animate-pulse space-y-4 mt-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>

                    <div className="h-5 bg-gray-200 rounded w-1/2 mt-6 mb-3"></div>

                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        </div>
                    </div>

                    <div className="h-5 bg-gray-200 rounded w-2/5 mt-6 mb-3"></div>

                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            ) : (
                <Markdown
                    components={{
                        h1: ({ node, ...props }) => (
                            <h1
                                className="text-2xl font-semibold text-black mb-4 leading-tight tracking-tight border-b border-gray-200 pb-2"
                                {...props}
                            />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2
                                className="text-xl font-semibold text-gray-900 mb-1 mt-6 leading-tight tracking-tight"
                                {...props}
                            />
                        ),
                        h3: ({ node, ...props }) => (
                            <h3
                                className="text-[17px] font-semibold text-gray-800 mt-4 mb-1 leading-snug"
                                {...props}
                            />
                        ),
                        h4: ({ node, ...props }) => (
                            <h4
                                className="text-base font-medium text-gray-700 mb-2 mt-2 leading-snug"
                                {...props}
                            />
                        ),
                        p: ({ node, ...props }) => (
                            <p
                                className="text-gray-700 leading-relaxed mb-2 text-base text-justify"
                                {...props}
                            />
                        ),
                        a: ({ node, ...props }) => (
                            <a
                                className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 underline-offset-2 transition-colors duration-200"
                                target="_blank"
                                rel="noreferrer"
                                {...props}
                            />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul
                                className="list-disc list-outside space-y-2 my-1 pl-5"
                                {...props}
                            />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol
                                className="list-decimal list-outside space-y-2 my-4 pl-5"
                                {...props}
                            />
                        ),
                        li: ({ node, ...props }) => (
                            <li
                                className="text-gray-700 leading-relaxed text-justify"
                                {...props}
                            />
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className="border-l-4 border-gray-400 bg-gray-50 pl-4 pr-3 py-2 my-4 italic text-gray-800 rounded-r-lg text-justify"
                                {...props}
                            />
                        ),
                        hr: ({ node, ...props }) => (
                            <hr
                                className="border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"
                                {...props}
                            />
                        ),

                        table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 shadow-sm">
                                <table
                                    className="min-w-full divide-y divide-gray-200"
                                    {...props}
                                />
                            </div>
                        ),
                        thead: ({ node, ...props }) => (
                            <thead className="bg-gray-50" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                            <tbody
                                className="bg-white divide-y divide-gray-200"
                                {...props}
                            />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td
                                className="px-6 py-4 text-sm text-gray-700"
                                {...props}
                            />
                        ),
                        tr: ({ node, ...props }) => (
                            <tr
                                className="hover:bg-gray-50 transition-colors duration-150"
                                {...props}
                            />
                        ),
                        code: ({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                        }) => {
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return !inline && match ? (
                                <div className="my-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 font-medium border-b border-gray-700 flex justify-between items-center">
                                        <span>{match[1]}</span>
                                    </div>
                                    <SyntaxHighlighter
                                        style={okaidia}
                                        language={match[1]}
                                        PreTag="div"
                                        className="!m-0 text-sm leading-relaxed"
                                        customStyle={{
                                            padding: "1rem",
                                            margin: 0,
                                            background: "#282c34",
                                        }}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm font-mono border"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ node, ...props }) => (
                            <pre
                                className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed my-4"
                                {...props}
                            />
                        ),
                        strong: ({ node, ...props }) => (
                            <strong
                                className="font-semibold text-gray-900"
                                {...props}
                            />
                        ),
                        em: ({ node, ...props }) => (
                            <em className="italic text-gray-800" {...props} />
                        ),
                        img: ({ node, ...props }) => (
                            <img
                                className="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto block"
                                {...props}
                            />
                        ),
                    }}
                >
                    {ai_response}
                </Markdown>
            )}
        </div>
    );
}
export default DisplaySummary;
