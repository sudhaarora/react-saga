import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);


  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelte = (id) => {
    console.log("id", id);
    if (window.confirm("Are you sure you want to delete that user?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully!");
    }
  };

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users &&
            users.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelte(item.id)}
                  >
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39", marginRight: "10px" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>
                  <Link to={`editUser/${item.id}`}>
                    <MDBTooltip title="Edit" tag="a">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{
                          color: "#55acee",
                          marginBottom: "15px",
                          marginRight: "10px",
                        }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>
                  <Link to={`userInfo/${item.id}`}>
                    <MDBTooltip title="View" tag="a">
                      <MDBIcon
                        fas
                        icon="eye"
                        style={{
                          color: "#3b5998",
                          marginBottom: "15px",
                          marginRight: "10px",
                        }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Home;
