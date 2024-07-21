"use client";

import { useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Modal from "../module/Modal";
import FeedbackFormModal from "./FeedbackFormModal";
import Button from "../module/Button";
import FeedbackItemModal from "./FeedbackItemModal";

function HomePage() {
  const [showFeedbackFormModal, setShowFeedbackFormModal] = useState(false);
  const [showFeedbackItemModal, setShowFeedbackItemModal] = useState(null);

  const openFeedbackFormModal = () => {
    setShowFeedbackFormModal(true);
  };

  const openFeedbackItemModal = (feedback) => {
    setShowFeedbackItemModal(feedback)
  };

  const feedBacks = [
    {
      title: "salam1",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 77,
    },
    {
      title: "salam2",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 55,
    },
    {
      title: "salam3",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 86,
    },
    {
      title: "salam4",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 87,
    },
    {
      title: "salam4",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 87,
    },
    {
      title: "salam4",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 87,
    },
    {
      title: "salam4",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 87,
    },
    {
      title: "salam4",
      description:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placehol",
      votesCount: 87,
    },
  ];

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
        classes= {showFeedbackFormModal ? "visible bg-black/50 duration-500" :"invisible"}
        onClose={() => setShowFeedbackFormModal(false)}
        title="Make a sujesstion"
      >
        <FeedbackFormModal />
      </Modal>

      <div className="px-8 space-y-4">
        {feedBacks.map((feedback, index) => (
          <>
            <FeedbackItem
              key={index}
              {...feedback}
              onOpen={() => openFeedbackItemModal(feedback)}
            />
          </>
        ))}
      </div>
      <Modal
        isOpen={showFeedbackItemModal}
        onClose={() => setShowFeedbackItemModal(false)}
      >
       <FeedbackItemModal {...showFeedbackItemModal}/>
      </Modal>
    </main>
  );
}

export default HomePage;
