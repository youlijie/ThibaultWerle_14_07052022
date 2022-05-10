import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { EmployeeContext } from '../data/context';
import DataTable from "react-data-table-component";
import { columns } from '../data/columns';

const EmployeesList = () => {

    const { employees } = useContext(EmployeeContext)
    const [employee, setEmployee] = useState(employees);

    const search = (e) => {
        const newValue = employees.filter(employee => {
            return employee.firstname.toLowerCase().includes(e.target.value.toLowerCase()) || employee.lastname.toLowerCase().includes(e.target.value.toLowerCase())
        }
        )
        setEmployee(newValue)
    }
    

    return (
        <div className='Employees-List-Page'>
            <Link to='/' className='btn-link top-btn'> Create a new employee </Link>
            <h1>Current Employees</h1>
            <DataTable columns = {columns} data = {employee} subHeader pagination selectableRows/>  
            <div className = "research-contenair">
                <label htmlFor="research">Search: </label>
                <input type="text" id="research" onChange={search} />
            </div>  
        </div>
    );
};

export default EmployeesList;