import React, { useState, useEffect } from "react";
import { FaDoorOpen, FaDownload, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableCaption,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Loader2, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiFrown } from "react-icons/fi";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://donations-prdd.onrender.com/api/user/get"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: "", // Empty password field by default
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = { ...formData };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      }

      await axios.patch(
        `https://donations-prdd.onrender.com/api/user/${editingUser._id}`,
        dataToUpdate
      );

      // Refresh the users list and close modal
      await fetchUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getMaxOpenDoor = (doorStatus) => {
    const openDoors = Object.entries(doorStatus || {})
      .filter(([_, status]) => status === true)
      .map(([door]) => parseInt(door));
    return openDoors.length > 0 ? Math.max(...openDoors) : null;
  };

  const downloadExcel = () => {
    const excelData = users.map((user, index) => ({
      "Sr#": index + 1,
      Username: user.username,
      Email: user.email,
      Phone: user.phone,
      "Referral Code": user.referralCode,
      "Current Door": getMaxOpenDoor(user.doorStatus) || "No open doors",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "User_Data.xlsx");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="flex items-center justify-center h-[60vh] mx-auto my-auto text-white bg-green min-w-screen">
        <div className="w-full max-w-sm p-6 text-center bg-gray-900 rounded-lg shadow-lg">
          <FiFrown className="mx-auto mb-4 text-6xl text-greengrass animate-bounce" />
          <h1 className="mb-4 text-3xl font-semibold text-gray-200">
            {"No User Found"}
          </h1>
          <p className="text-lg text-gray-400">{"May Be Server Error "}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="ml-3 text-xl font-bold text-lightgray">All Data</h1>
        <button
          variant="outline"
          className="flex items-center p-1 px-2 text-white transition-colors duration-500 rounded-md bg-greengrass hover:bg-green"
          onClick={downloadExcel}
        >
          <FaDownload className="mr-2 text-2xl text-white md:text-lg" />
          <span className="hidden mt-1 md:block">Download Data</span>
        </button>
      </div>
      <Card className="w-full mx-2 rounded-sm bg-green">
        <div className="h-[50vh] lg:h-[80vh] overflow-scroll">
          <Table>
            <TableCaption>
              List of users and their highest open door
            </TableCaption>
            <TableHeader>
              <TableRow className=" bg-grassGreen">
                <TableCell className="font-medium">Sr#</TableCell>
                <TableCell className="font-medium">Username</TableCell>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell className="font-medium">Referral Code</TableCell>
                <TableCell className="font-medium">Current Door</TableCell>
                <TableCell className="font-medium">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => {
                const maxDoor = getMaxOpenDoor(user.doorStatus);

                return (
                  <TableRow key={user.email}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.referralCode}</TableCell>
                    <TableCell>
                      {maxDoor !== null ? (
                        <div className="flex items-center gap-2">
                          <FaDoorOpen className="text-green-500" />
                          <span>Door {maxDoor}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No open doors</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog
        className="bg-white"
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      >
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTable;
