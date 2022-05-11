import React from 'react';
import Table from "../../components/ReactTable/reacttable";
import "./projects-page.scss"

const Projects = () => {

    const theadData = ["Project", "Status", "Responses", "Owner", "Modified", "Created"];

    const tbodyData = [
        {
            id: "1",
            items: ["Important Survey", "Open", "25", "Mark Wagner - SVP" , "Mar 3, 2022", "Feb 1, 2022"],
        },
        {
            id: "2",
            items: ["Bad Survey", "Closed", "3", "Nate Hanson - Developer" , "Mar 6, 2022", "Feb 31, 2022"],
        },
        {
            id: "3",
            items: ["Okay Survey", "Closed", "15", "Nate Hanson - Developer" , "Mar 7, 2022", "Feb 28, 2022"],
        },
    ];
    return (

        <div className="fullpage">
            <div className='tablecontainer'>
                <Table theadData={theadData} tbodyData={tbodyData} />
            </div>
        </div>
    );



};

export default Projects;


