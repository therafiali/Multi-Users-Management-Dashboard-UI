import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import EditUser from "./EditUser";
import DeleteUser from "../DeleteUser";
import Loader from "./Loader";

const UsersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fake user data
  const fakeData = {
    total_count: 15,
    data: [
      { _id: "1", name: "Alice Johnson", role: "admin" },
      { _id: "2", name: "Bob Smith", role: "user" },
      { _id: "3", name: "Charlie Brown", role: "moderator" },
      { _id: "4", name: "David Lee", role: "user" },
      { _id: "5", name: "Emma Watson", role: "admin" },
      { _id: "6", name: "Frank Miller", role: "user" },
      { _id: "7", name: "Grace Hopper", role: "moderator" },
      { _id: "8", name: "Hannah Baker", role: "user" },
      { _id: "9", name: "Ian Fleming", role: "admin" },
      { _id: "10", name: "Jane Doe", role: "user" },
      { _id: "11", name: "Kevin Hart", role: "user" },
      { _id: "12", name: "Linda Smith", role: "moderator" },
      { _id: "13", name: "Mike Tyson", role: "user" },
      { _id: "14", name: "Nina Simone", role: "admin" },
      { _id: "15", name: "Oscar Wilde", role: "user" },
    ],
  };

  const data = fakeData;

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="px-8">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <EditUser
                      user_name={user.name}
                      user_role={user.role}
                      _id={user._id}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteUser _id={user._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="td"
                count={data.total_count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersList;
