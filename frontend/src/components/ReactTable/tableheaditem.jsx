import React from "react";
import "./reacttable.scss";

const TableHeadItem = ({ item }) => {
    return (
        <td title={item}>
            <strong>{item}</strong> <span>&#9662;</span>
        </td>
    );
};

export default TableHeadItem;