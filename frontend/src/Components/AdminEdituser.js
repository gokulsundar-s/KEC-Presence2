import { React, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import "../Styles/AdminPage.css";

export default function Edituser() {
    const [usertype, setUsertype] = useState('');
    const [department, setDepartment] = useState('');
    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');
    const [mail, setMail] = useState('');
    const [year, setYear] = useState('');
    const [section, setSection] = useState('');
    const [phone, setPhone] = useState('');
    const [pphone, setPphone] = useState('');
    const [pmail, setPmail] = useState('');
    
    const handleUsertypeChange = (event) => {
        setUsertype(event.target.value);
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleRollNumberChange = (event) => {
        setRoll(event.target.value);
    };
    const handleMailChange = (event) => {
        setMail(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handlePphoneChange = (event) => {
        setPphone(event.target.value);
    };
    const handlePmailChange = (event) => {
        setPmail(event.target.value);
    };

    const handleSearch = async () => {
        if(usertype === "" || usertype === "User Type"){
            toast.error("Select usertype!!")
        }
        else if(mail ===""){
            toast.error("Enter a valid mail ID");
        }
        else{
            const result = await axios.post('http://localhost:3003/adminsearchuser', { usertype, mail });
            if(result.data === null){
                toast.error("No data found!!");
                setDepartment("");
                setName("");
                setRoll("");
                setYear("");
                setSection("");
                setPhone("");
                setPphone("");
                setPmail("");            
            }
            else if(result.data !== null){
                setDepartment(result.data.department);
                setName(result.data.name);
                setRoll(result.data.roll);
                setYear(result.data.year);
                setSection(result.data.section);
                setPhone(result.data.phone);
                setPphone(result.data.pphone);
                setPmail(result.data.pmail);
            }
        }
    }

    const handleEdituser = async () => {
        setName(name.toUpperCase());
        setRoll(roll.toUpperCase());
        
        if(department === "" || department === "Department"){
            toast.error("Enter a valid department!!");
        }
        else if(name === ""){
            toast.error("Enter a valid name!!");
        }
        else if(roll === "" && roll.length !== 8){
            toast.error("Enter a valid roll number!!");
        }
        else if(year === "" || year === "Year"){
            toast.error("Enter a valid year!!");
        }
        else if(section === "" || section === "Section"){
            toast.error("Enter a valid section!!");
        }
        else if(phone === "" || phone.length !== 10){
            toast.error("Enter a valid phone number!!");
        }
        else if(pphone === "" || pphone.length !== 10){
            toast.error("Enter a valid parent's phone number!!");
        }
        else if(!pmail || !pmail.includes("@")){
            toast.error("Enter a valid parent's mail ID!!");
        }
        else{
            try{
                const result = await axios.post('http://localhost:3003/adminedituser', { usertype, department, name, roll, mail, year,section, phone, pphone, pmail });
                if(result.data === "true"){
                    toast.success("User data updated successfully!!");
                    setMail("");
                    setUsertype("");
                    setDepartment("");
                    setName("");
                    setRoll("");
                    setYear("");
                    setSection("");
                    setPhone("");
                    setPphone("");
                    setPmail("");  
                }
                else if(result.data === "false"){
                    toast.error("User data is not modified!!");
                }
            }
            catch(error){
                toast.error("Some error occured!!");
            }
        }
    };

    return(
        <div className = "adminedit-container">
            <p className = "components-header">Edit user data</p>
            
            <div className = "adminedit-form-container">
                <form action = "submit" onSubmit={(event) => event.preventDefault()}>
                    
                    <div className = "form-input-container-block">
                        <div className = "form-input-container">
                            <p>User Type :</p>
                            <select value={usertype} onChange={handleUsertypeChange} require="true">
                                <option>User Type</option>
                                <option>Student</option>
                                <option>Class advoicer</option>
                                <option>Year incharge</option>
                                <option>Head of the department</option>
                            </select>
                        </div>

                        <div className = "form-input-container">
                            <p>Mail ID :</p>
                            <input placeholder = "Kongu Mail ID" type = "mail" value={mail} onChange={handleMailChange} require="true"></input>
                        </div>
                        
                        <div className = "form-buttons-container edit-button">
                            <button onClick={() => handleSearch()}>Search</button>
                        </div>
                    </div>
                
                    <div className = "form-input-container-block">
                        <div className = "form-input-container">
                        <p>Department :</p>
                            <select value={department} onChange={handleDepartmentChange} require="true">
                                <option>Department</option>
                                <option>Artificial Intelligence and Data Science</option>
                                <option>Artificial Intelligence and Machine Learning</option>
                                <option>Automobile Engineering</option>
                                <option>Chemical Engineering</option>
                                <option>Civil Engineering</option>
                                <option>Computer Application</option>
                                <option>Computer Science and Engineering</option>
                                <option>Computer Science and Design</option>
                                <option>Computer Technology - PG</option>
                                <option>Computer Technology - UG</option>
                                <option>Electrical and Electronics Engineering</option>
                                <option>Electronics and Communication Engineering</option>
                                <option>Electronics and Instrumentation Engineering</option>
                                <option>Food technology</option>
                                <option>Information Technology</option>
                                <option>Mechanical Engineering</option>
                                <option>Mechatronics Engineering</option>
                                <option>Science and Humanity</option>
                            </select>
                        </div>
                        
                        <div className = "form-input-container">
                            <p>Name :</p>
                            <input placeholder = "Name" type = "text" value={name} onChange={handleNameChange} require="true"></input>
                        </div>
                    </div>

                    <div className = "form-input-container-block">
                        <div className = "form-input-container">
                            <p>Roll Number :</p>
                            <input placeholder = "Roll Number" type = "text" value={roll} onChange={handleRollNumberChange} require="true"></input>
                        </div>

                        <div className = "form-input-container">
                            <p>Year :</p>
                            <select value={year} onChange={handleYearChange} require="true">
                                <option>Year</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <div className = "form-input-container-block">
                        <div className = "form-input-container">
                            <p>Section :</p>
                            <select value={section} onChange={handleSectionChange} require="true">
                                <option>Section</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                                <option>D</option>
                            </select>
                        </div>
                        
                        <div className = "form-input-container">
                            <p>Phone Number :</p>
                            <input placeholder = "Phone number" type = "tel" value={phone} onChange={handlePhoneChange} require="true"></input>
                        </div>
                    </div>


                    <div className = "form-input-container-block">
                        <div className = "form-input-container">
                            <p>Parent's Phone Number :</p>
                                <input placeholder = "Parent's Phone Number" type = "tel" value={pphone} onChange={handlePphoneChange} require="true"></input>
                        </div>
                        <div className = "form-input-container">
                            <p>Parent's Mail ID :</p>
                            <input placeholder = "Parent's Mail ID" type = "mail" value={pmail} onChange={handlePmailChange} require="true"></input>
                        </div>
                    </div>
                
                    <div className = "form-buttons-container">
                        <button onClick={() => handleEdituser()}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}