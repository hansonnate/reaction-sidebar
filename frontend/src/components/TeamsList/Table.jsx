import React from "react";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";


const Table = () => {
    const headers = ['Project', 'Status', 'Responses', 'Owner', 'Modified', 'Created']

    return (
        <>
            <table className={`${styles.fulltable}`}>
                <thead>
                    <tr className={`${styles.header}`}>
                        {headers.map(head => <th key={head}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link to="survey1">Survey 1</Link></td>
                        <td>00001</td>
                        <td>Blue</td>
                    </tr>
                    <tr>
                        <td>Sue</td>
                        <td>00002</td>
                        <td>Red</td>
                    </tr>
                    <tr>
                        <td>Barb</td>
                        <td>00003</td>
                        <td>Green</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};


export default Table;