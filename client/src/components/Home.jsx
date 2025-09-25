import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAllFeedbacks } from "../redux/user/userSlice";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

function Home() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const dispatch = useDispatch();
  const [feedbackModal, setFeedbackModal] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await dispatch(getAllFeedbacks());
      const result = await unwrapResult(data);
      setAllFeedbacks(result.result);
    }
    getData();
  }, [dispatch]);

  function onSubmit(data) {
    setAllFeedbacks(
      allFeedbacks.filter((feedback) => data._id !== feedback._id)
    );
    setAllFeedbacks((prev) => [...prev, data]);
  }
  function deleteit(data) {
    setAllFeedbacks(
      allFeedbacks.filter((feedback) => data._id !== feedback._id)
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Feedbacks</h1>
        <Button onClick={() => setFeedbackModal(true)}>New Feedback</Button>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allFeedbacks.length > 0 ? (
          [...allFeedbacks]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((feedback) => (
              <DisplayFeed
                key={feedback._id}
                feedback={feedback}
                onSubmit={onSubmit}
                deleteit={deleteit}
              />
            ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No feedbacks yet.
          </div>
        )}
      </div> */}
      {/* <Modal show={feedbackModal} onClose={() => setFeedbackModal(false)}>
        <ModalHeader>New Feedback Entry</ModalHeader>
        <ModalBody>
          <Feedback
            onSubmit={onSubmit}
            closeModal={() => setFeedbackModal(false)}
          />
        </ModalBody>
      </Modal> */}
    </div>
  );
}

export default Home;
