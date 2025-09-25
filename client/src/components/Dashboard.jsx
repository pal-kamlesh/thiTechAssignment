import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  adminFeedbacks,
  deleteTheFeedback,
  getAllUsers,
} from "../redux/user/userSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState({});

  console.log(currentUser);
  useEffect(() => {
    async function fetchData() {
      try {
        const actionResult = await dispatch(
          adminFeedbacks({ userId: selectedUser._id })
        );
        const result = unwrapResult(actionResult);
        setAllFeedbacks(result.result);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    }
    if (currentUser.role === "admin") {
      fetchData();
    } else {
      toast.error("Only for admin!");
      navigate("/");
    }
  }, [selectedUser]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResults = await dispatch(getAllUsers());
        const usersData = await unwrapResult(usersResults);
        setAllUser(usersData.result);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    }
    fetchData();
  }, []);

  function onSubmit(data) {
    setAllFeedbacks(
      allFeedbacks.filter((feedback) => data._id !== feedback._id)
    );
    setAllFeedbacks((prev) => [...prev, data]);
  }
  const deleteFeedback = async (id) => {
    const result = await dispatch(deleteTheFeedback({ id }));
    const data = await unwrapResult(result);
    deleteit(data.result);
    toast.success(data.message);
  };
  function deleteit(data) {
    setAllFeedbacks(
      allFeedbacks.filter((feedback) => data._id !== feedback._id)
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="p-4">
          <select className="w-20 h-8 bg-cyan-400 border border-blue-800 rounded-md">
            <option></option>
            {allUser?.length > 0 &&
              allUser?.map((user) => (
                <option key={user?._id} onClick={() => setSelectedUser(user)}>
                  <div>{user?.username}</div>
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell className="text-xl">ID</TableHeadCell>
              <TableHeadCell className="text-xl">USERNAME</TableHeadCell>
              <TableHeadCell className="text-xl">Feedback</TableHeadCell>
              <TableHeadCell className="text-xl">Date</TableHeadCell>
              <TableHeadCell className="text-xl">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {allFeedbacks.length > 0 ? (
              [...allFeedbacks]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((feedback, idx) => (
                  <TableRow
                    key={feedback._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {allFeedbacks.length - idx}
                    </TableCell>
                    <TableCell>{feedback.user.username}</TableCell>
                    <TableCell>{feedback.feedback}</TableCell>
                    <TableCell>
                      {new Date(feedback.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-3">
                      <Button
                        color="green"
                        onClick={() => {
                          setActiveFeedback(feedback);
                          setViewModal(true);
                          console.log("view");
                        }}
                      >
                        View
                      </Button>
                      <Button
                        color="yellow"
                        onClick={() => {
                          setActiveFeedback(feedback);
                          setEditModal(true);
                          console.log("edit");
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        onClick={() => deleteFeedback(feedback._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No feedbacks yet.
              </div>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <Modal show={editModal} onClose={() => setEditModal(false)}>
        <ModalHeader>Update Feedback</ModalHeader>
        <ModalBody>
          <Feedback
            feedback={activeFeedback}
            onSubmit={onSubmit}
            closeModal={() => setEditModal(false)}
          />
        </ModalBody>
      </Modal> */}

      {/* <Modal show={viewModal} onClose={() => setViewModal(false)}>
        <ModalHeader>View Feedback</ModalHeader>
        <ModalBody>
          <div className="text-gray-800 text-base mb-2">
            {activeFeedback.feedback}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(activeFeedback.createdAt).toLocaleString()}
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
}

export default Dashboard;
