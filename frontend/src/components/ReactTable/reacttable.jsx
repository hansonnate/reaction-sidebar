import React from "react";
import TableRow from "./tablerow";
import TableHeadItem from "./tableheaditem";
import "./reacttable.scss";

const Table = ({ theadData, tbodyData}) => {
    return (
        <table className="reacttable">
            <tr className="header">
                {theadData.map((h) => {
                    return <TableHeadItem key={h} item={h} />;
                })}
            </tr>
            <tbody>
                {tbodyData.map((item) => {
                    return <TableRow key={item.id} data={item.items} />;
                })}
            </tbody>
        </table>
    );
};

export default Table;