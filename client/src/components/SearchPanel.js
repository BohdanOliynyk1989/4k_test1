import React from "react";

export const SearchPanel = ({change}) => {

    return (
        <input
            type="text"
            placeholder='Введіть дані для пошуку'
            onChange={e => change(e.target.value)}
        />
    )
}