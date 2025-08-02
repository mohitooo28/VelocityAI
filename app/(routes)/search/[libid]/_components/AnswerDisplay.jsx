import Image from "next/image";
import React, { useState, useEffect } from "react";
import SourceList from "./SourceList";
import DisplaySummary from "./DisplaySummary";
function AnswerDisplay({ chat, loadingSearch }) {
    return (
        <div>
            <SourceList
                webResult={chat?.search_result}
                loadingSearch={loadingSearch}
            />
            <DisplaySummary ai_response={chat?.ai_response} />
        </div>
    );
}

export default AnswerDisplay;
