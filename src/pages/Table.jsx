import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import * as React from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './Auth.css'

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, putUser, usersUser } from "../store/slices/userSlice";
import Navbar from "./Navbar";
import { Box, Modal, Typography } from "@mui/material";

const UserTable = () => {
  const [user,setUser]=useState({})
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [selectId, setSelectId] = useState();
  const [, forceUpdate] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (row) => {
    setUser(row)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    setAge(user.age)
    setEmail(user.email)
    setName(user.name)
  },[user])

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #FFF",
    boxShadow: 4,
    p: 4,
  };

  const editUser = () => {
    const body = {
      id: user.id,
      email: email,
      password: user.password,
      name: name,
      age: age,
      role: user.role,
      status: user.status,
    };
    dispatch(putUser(body));
    setOpen(false)
  };

  const deleteUserById = (id) => {
    forceUpdate({});
    setSelectId(id);
    dispatch(deleteUser(id));
    dispatch(usersUser());
  };

  useEffect(() => {
    dispatch(usersUser());
  }, [open]);

  console.log(window.location.href);

  return (
    <div>
      <Navbar />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => deleteUserById(row.id)}>Delete</Button>
                  <Button onClick={()=>handleOpen(row)}>Update</Button>
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className="inp"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          request
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          request
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          type="text"
                          request
                          placeholder="Age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <button onClick={editUser}>Save</button>
                        <button className="exit" onClick={handleClose}>X</button>
                      </Typography>
                    </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
