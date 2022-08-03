import React from "react";

function Counter(props) {
    const { value } = props;
    return (
        <p data-testid="counter-test">
            {value}
        </p>
    );
}

export default Counter;