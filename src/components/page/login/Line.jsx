import React from "react";

const Line = () => {
    return (
        <div
            style={{
                fillOpacity: "0.3",
                width: "100%",
                textAlign: "center",
                borderBottom: "1px solid #aaa",
                lineHeight: "0.1em"
            }}
        >
            <span style={{ background: "#fff", padding: "0 16px", color:"#4B5563"}}>또는</span>
        </div>
    );
};

export default Line;