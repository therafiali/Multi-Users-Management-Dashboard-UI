// components/TablePaginator.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
} from "@mui/material";
import { BACKEND_URL, BottomGradient, LabelInputContainer } from "@/components/ui/Login";
import {
    Modal,
    ModalTrigger,
    ModalBody,
    ModalContent,
  } from "@/components/ui/animated-modal";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import EditIcon from "@mui/icons-material/Edit";

const fetchTableData = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${BACKEND_URL}/scraper/yellowpages/paginate?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};

const TablePaginator = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const loadTableData = async () => {
      const { data, total_count } = await fetchTableData(page + 1, rowsPerPage);
      setData(data);
      setTotalCount(total_count);
    };

    loadTableData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleEditClick = (row) => {
    setSelectedRow(row); // Set the selected row data
  };

  const handleCloseModal = () => {
    setSelectedRow(null); // Clear the selected row data when closing the modal
  };

  const handleChange = (event) => {
    setSelectedRow({
      ...selectedRow,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Link</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(row)}
                  >
                    <Modal>
                      <ModalTrigger>
                        <EditIcon />
                      </ModalTrigger>
                      <ModalBody  onClose={handleCloseModal} >
                        <ModalContent>
                          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                            Edit Here
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="businessName">
                                Business Name
                              </Label>
                              <Input
                                id="name"
                                value={selectedRow?.name || ""}
                                onChange={handleChange}
                                placeholder="Alpha LLC"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="phoneNumber">Phone Number</Label>
                              <Input
                                id="phone"
                                value={selectedRow?.phone || ""}
                                onChange={handleChange}
                                placeholder="541-654-6168"
                                type="tel"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={selectedRow?.address || ""}
                                onChange={handleChange}
                                placeholder="123 Main St, London, UK"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                value={selectedRow?.link || ""}
                                onChange={handleChange}
                                placeholder="https://www.alpha-llc.com"
                                type="url"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="moreInfo">More Info</Label>
                              <Input
                                id="moreInfo"
                                value={selectedRow?.other_info || ""}
                                onChange={handleChange}
                                placeholder="Additional details about the business"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="extraPhones">Extra Phones</Label>
                              <Input
                                id="extraPhones"
                                value={selectedRow?.extra_phones || ""}
                                onChange={handleChange}
                                placeholder="041-564-5612"
                                type="tel"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="otherLink">Other Link</Label>
                              <Input
                                id="otherLink"
                                value={selectedRow?.other_links || ""}
                                onChange={handleChange}
                                placeholder="http://www.example.com"
                                type="url"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="cuisines">Cuisines</Label>
                              <Input
                                id="cuisines"
                                value={selectedRow?.cuisines || ""}
                                onChange={handleChange}
                                placeholder="Bed & Breakfast, Resorts, Guesthouses"
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="longDetails">
                                Restaurant Long Description
                              </Label>
                              <Input
                                id="longDetails"
                                value={selectedRow?.long_details || ""}
                                onChange={handleChange}
                                placeholder="A detailed description of the restaurant's offerings and atmosphere."
                                type="text"
                              />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                              <Label htmlFor="shortDetails">
                                Restaurant Short Description
                              </Label>
                              <Input
                                id="shortDetails"
                                value={selectedRow?.short_details || ""}
                                onChange={handleChange}
                                placeholder="A brief summary of the restaurant."
                                type="text"
                              />
                            </LabelInputContainer>
                          </div>

                          <button
                            className="bg-gradient-to-br relative group/btn from-indigo-700 dark:from-indigo-900 dark:to-indigo-900 to-neutral-600 block dark:bg-indigo-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--indigo-800)_inset,0px_-1px_0px_0px_var(--indigo-800)_inset]"
                            type="submit"
                          >
                            Save Changes &rarr;
                            <BottomGradient />
                          </button>
                        </ModalContent>
                      </ModalBody>
                    </Modal>
                  </IconButton>
                </TableCell>
                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 250, 500, 1000]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TablePaginator;
