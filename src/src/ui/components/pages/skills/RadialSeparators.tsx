import React from "react";
import _ from "lodash";

function Separator({ turns, style }: any) {
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                transform: `rotate(${turns}turn)`
            }}
        >
            <div style={style} />
        </div>
    );
}

function RadialSeparators({ style, count }: any) {
    const turns = 1 / count;
    const separators = _.range(count).map(index => (
        <Separator turns={index * turns} style={style} key={index} />
    ));

    return <>{separators}</>;
}

export default RadialSeparators;
