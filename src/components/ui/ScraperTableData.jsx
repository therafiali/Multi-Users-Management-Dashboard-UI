"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BACKEND_URL, BottomGradient, LabelInputContainer } from "@/components/ui/Login";

const DataTable = () => {
  const [scrapeData, setScrapeData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // State for the selected row

  async function fetchData() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/scraper/yellowpages/paginate?page=1&limit=100`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      
      setError(error.message);
      return { data: [] }; // Return empty data on error
    }
  }

  useEffect(() => {
    async function loadData() {
      const result = await fetchData();
      setScrapeData(result.data);
    }

    loadData();
  }, []);

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

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell className="w-52">Categories</TableCell>
            <TableCell>Action</TableCell> {/* New column for Action */}
          </TableRow>
        </TableHead>
        <TableBody>
          {scrapeData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.categories}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClick(row)}
                >
                  <Modal>
                    <ModalTrigger>
                      <EditIcon />
                    </ModalTrigger>
                    <ModalBody onClose={handleCloseModal}>
                      <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                          Edit Here
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                              id="name"
                              value={selectedRow?.name || ''}
                              onChange={handleChange}
                              placeholder="Alpha LLC"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                              id="phone"
                              value={selectedRow?.phone || ''}
                              onChange={handleChange}
                              placeholder="541-654-6168"
                              type="tel"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={selectedRow?.address || ''}
                              onChange={handleChange}
                              placeholder="123 Main St, London, UK"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={selectedRow?.link || ''}
                              onChange={handleChange}
                              placeholder="https://www.alpha-llc.com"
                              type="url"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="moreInfo">More Info</Label>
                            <Input
                              id="moreInfo"
                              value={selectedRow?.other_info || ''}
                              onChange={handleChange}
                              placeholder="Additional details about the business"
                              type="text"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="extraPhones">Extra Phones</Label>
                            <Input
                              id="extraPhones"
                              value={selectedRow?.extra_phones || ''}
                              onChange={handleChange}
                              placeholder="041-564-5612"
                              type="tel"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="otherLink">Other Link</Label>
                            <Input
                              id="otherLink"
                              value={selectedRow?.other_links || ''}
                              onChange={handleChange}
                              placeholder="http://www.example.com"
                              type="url"
                            />
                          </LabelInputContainer>

                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="cuisines">Cuisines</Label>
                            <Input
                              id="cuisines"
                              value={selectedRow?.cuisines || ''}
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
                              value={selectedRow?.long_details || ''}
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
                              value={selectedRow?.short_details || ''}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
