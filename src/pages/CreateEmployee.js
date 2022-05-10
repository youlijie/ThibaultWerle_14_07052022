import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { departments } from "../data/departments";
import { statesUSA } from "../data/states";
import Modal from "modal-module-thiw";
import "modal-module-thiw/dist-unminified/index.css";
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

    // Reset form
    const reset = () => {
        formRef.current.reset();
        setResetKey(new Date().getTime());
    }

    //regex
    const regex = /^[a-zA-Z]{2,}$/;

    //validation
    const validate = () => {
        if (firstname.match(regex) && lastname.match(regex) && birthdate && startDate && street && city && state && zipCode && department) {
            return true;
        } else {
            return false;
        }
    }

    //Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = {
            firstname: firstname,
            lastname: lastname,
            birthdate: withoutTime(birthdate),
            startDate: withoutTime(startDate),
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            department: department,
        }
        if (validate()) {
        saveEmployees(employee);
        setIsModalProp("open");
        reset();
        } else {
            return (alert("Please fill in all the fields correctly"));
        }
    }

    const withoutTime = (dateTime) => { //clean date 
      var d = new Date(dateTime);
      var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      return date;
    }


    return (
        <main>
      <div className="split top">
        <div className="main-select">
          <h1>HRnet</h1>
          <h2>Create Employee</h2>
          <Link to="/employee-list" className="btn-link margin-btn">
            View Current Employees
          </Link>
        </div>
      </div>
      <div className="split bottom">
        <form className="create-employee-form" ref={formRef}>
          <span>First name</span>
          <input type="text" onChange={(e) => setFirstname(e.target.value)} required />

          <span>Last name</span>
          <input type="text" onChange={(e) => setLastname(e.target.value)} required />

          <span>Date of birth</span>
          <DayPicker fromYear={1940} toYear={2022} captionLayout="dropdown" mode="single" required
            selected={birthdate}
            onSelect={setBirthdate}
            styles={{ caption : { color: '#fca311' }, day_selected: { backgroundColor: '#fca311' } }}
          />

          <span>Start date</span>
          <DayPicker
            mode="single" required
            selected={startDate}
            onSelect={setStartDate}
            styles={{ caption : { color: '#fca311' }, day_selected: { backgroundColor: '#fca311' } }}
          />

          <div className="adresse">
            <h3>Address</h3>

            <span>Street</span>
            <input type="text" onChange={(e) => setStreet(e.target.value)} required />

            <span>City</span>
            <input type="text" onChange={(e) => setCity(e.target.value)} required />

            <span>State</span>
            <Select
              className="whiteblank2"
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

        <button className="btn" onClick={handleSubmit} type="submit">
            Save
        </button>
        </form>
      </div>
      <Modal setIsModalProp={setIsModalProp} isModalProp={isModalProp} content={"Employee Created!"} modalStyle={{backgroundColor: "#e5e5e5", color: "#14213d"}}/>
        </main>
    )
}

export default CreateEmployee
