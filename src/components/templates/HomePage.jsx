"use client";

import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Modal from "../module/Modal";
import FeedbackFormModal from "./FeedbackFormModal";
import Button from "../module/Button";
import FeedbackItemModal from "./FeedbackItemModal";
import { useQuery } from "@tanstack/react-query";
import { getFeedbackFn } from "@/servises/feedbackService";
import Loader from "../module/Loader";
import { useRouter } from "next/navigation";

function HomePage() {
  const [showFeedbackFormModal, setShowFeedbackFormModal] = useState(false);
  const [showFeedbackItemModal, setShowFeedbackItemModal] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const router = useRouter()

  const { data, isPending } = useQuery({
    queryFn: getFeedbackFn,
    queryKey: ["get-feedbacks"],
  })

  const openFeedbackFormModal = () => {
    setShowFeedbackFormModal(true);
  };

  const openFeedbackItemModal = (feedback) => {
    setShowFeedbackItemModal(feedback);
  };

  useEffect(() => {
    if (data) {
      setFeedbacks(data)
    }
  },[data])

  return (
    <main className="bg-white md:shadow-lg rounded-lg mt-8 border overflow-hidden border-solid">
      <div className="bg-purple-300 p-8">
        <h1 className="text-4xl font-bold mb-4">Feedback Board</h1>
        <p className="text-opacity-90">
          Help me deside what should i biuld next or how can i improve
        </p>
      </div>

      <div className="bg-gray-100 flex items-center justify-between mt-4 mb-4  px-8">
        filters
        <Button onClick={openFeedbackFormModal}>Make a sujestion</Button>
      </div>

      <Modal
        isOpen={showFeedbackFormModal}
        onClose={() => setShowFeedbackFormModal(false)}
        title="Make a sujesstion"
      >
        <FeedbackFormModal onClose={() => setShowFeedbackFormModal(false)}/>
      </Modal>

      <div className={`px-8 pb-8 min-h-96 ${isPending && "flex items-center justify-center"}`}>
        {isPending ? (
          <Loader width={100} height={100} color="rgb(216 180 254)" />
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback._id}
                  {...feedback}
                  onOpen={() => openFeedbackItemModal(feedback)}
                />  
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showFeedbackItemModal}
        onClose={() => setShowFeedbackItemModal(false)}
      >
        <FeedbackItemModal {...showFeedbackItemModal} />
      </Modal>
    </main>
  );
}

export default HomePage;
