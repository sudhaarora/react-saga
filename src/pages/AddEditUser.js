import React, { useState, useEffect } from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUsersStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUsersStart(formValue));
        toast.success("User Added Successfully!");
        setTimeout(() => navigate.push("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Update Successfully!");
        setTimeout(() => navigate.push("/"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleGoBack = () => {
    navigate.push("/");
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!editMode ? "Add " : "Update "}User Detail
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBValidationItem feedback="Please provide a name." invalid>
          <MDBInput
            value={name || ""}
            name="name"
            type="text"
            onChange={onInputChange}
            required
            label="Name"
            // validation="Please provide a name"
            // invalid
          />
        </MDBValidationItem>
        <br />

        <MDBValidationItem feedback="Please provide a email." invalid>
          <MDBInput
            value={email || ""}
            name="email"
            type="email"
            onChange={onInputChange}
            required
            label="Email"
            // validation="Please provide a email"
            // invalid
          />
        </MDBValidationItem>
        <br />

        <MDBValidationItem feedback="Please provide a phone no." invalid>
          <MDBInput
            value={phone || ""}
            name="phone"
            type="number"
            onChange={onInputChange}
            required
            label="Phone"
            // validation="Please provide a phone no."
            // invalid
          />
        </MDBValidationItem>
        <br />

        <MDBValidationItem feedback="Please provide a address." invalid>
          <MDBInput
            value={address || ""}
            name="address"
            type="text"
            onChange={onInputChange}
            required
            label="Address"
            // validation="Please provide a address"
            // invalid
          />
        </MDBValidationItem>
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={handleGoBack} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
