import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { departments } from "../data/departments";
import { statesUSA } from "../data/states";
import Modal from "modal-module-thiw";
import { EmployeeContext } from "../data/context";


function CreateEmployee() {
    //Form
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [department, setDepartment] = useState("");
    //Modal
    const [isModalProp, setIsModalProp] = useState("closed");
    //Rest
    const { saveEmployees } = useContext(EmployeeContext);
    const formRef = useRef();
    const [resetKey, setResetKey] = useState(new Date().getTime());

    const reset = () => {
        formRef.current.reset();
        setResetKey(new Date().getTime());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = {
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            startDate: startDate,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            department: department,
        }
        saveEmployees(employee);
        setIsModalProp("open");
    }


    return (
        <main>
            <div className="split left">
        <div className="main-select">
          <h1>HRnet</h1>
          <h2>Create Employee</h2>
          <Link to="/employee-list" className="btn-link margin-btn">
            View Current Employees
          </Link>
        </div>
      </div>
      <div className="split right">
        <form className="create-employee-form" onSubmit={(e) => handleSubmit(e)} ref={formRef}>
          <span>First name</span>
          <input type="text" onChange={(e) => setFirstname(e.target.value)} required />

          <span>Last name</span>
          <input type="text" onChange={(e) => setLastname(e.target.value)} required />

          <span>Date of birth</span>
          <DayPicker fromYear={1940} toYear={2022} captionLayout="dropdown"
            mode="single" required
            onDayChange={(day) => {
              setBirthdate(day.toLocaleDateString());
            }}
            key={`daypicker1 ${resetKey}`}
          />

          <span>Start date</span>
          <DayPicker
            mode="single" required
            onDayChange={(day) => {
              setStartDate(day.toLocaleDateString());
            }}
            key={`daypicker2 ${resetKey}`}
          />

          <div className="adresse">
            <h3>Address</h3>

            <span>Street</span>
            <input type="text" onChange={(e) => setStreet(e.target.value)} required />

            <span>City</span>
            <input type="text" onChange={(e) => setCity(e.target.value)} required />

            <span>State</span>
            <Select
              className="whiteblank"
              isSearchable="true"
              name="statesUSA"
              options={statesUSA}
              onChange={(e) => setState(e.value)}
              key={`react-select1 ${resetKey}`}
            />

            <span>Zip code</span>
            <input type="number" onChange={(e) => setZipCode(e.target.value)} required />
          </div>

          <span className="margin-top-10">Department</span>
          <Select
            className="whiteblank"
            isSearchable="true"
            name="departments"
            options={departments}
            onChange={(e) => setDepartment(e.value)}
            key={`react-select2 ${resetKey}`}
          />

          <button className="btn" type="submit">
            Save
          </button>
        </form>
        <Modal isModalProp={"closed"} content={"Employee Created!"} modalStyle={{backgroundColor: "#708622"}}/>
      </div>
        </main>
    )
}

export default CreateEmployee
