import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { EmployeeContext } from '../data/context';
import DataTable from "react-data-table-component";
import { columns } from '../data/columns';

const EmployeesList = () => {

    const { employees } = useContext(EmployeeContext);

    return (
        <div className='Employees-List-Page'>
            <Link to='/' className='btn-link top-btn'> Create a new employee </Link>
            <h1>Current Employees</h1>
            <DataTable columns = {columns} data = {employees} pagination/>    
        </div>
    );
};

export default EmployeesList;