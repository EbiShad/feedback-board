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
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



function HomePage() {
  const [showFeedbackFormModal, setShowFeedbackFormModal] = useState(false);
  const [showFeedbackItemModal, setShowFeedbackItemModal] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [votes, setVotes] = useState([]);
  const [sort, setSort] = useState("votes");
  const session = useSession()
  const router = useRouter()

  
  const { data:feedbackData, isPending:isLoadingFeedbacks } = useQuery({
    queryFn: getFeedbackFn,
    queryKey: ["get-feedbacks"],
  })

  const { data:feedbackSortedData, isPending:isLoadingSortedFeedbacks } = useQuery({
    queryFn: () => {axios.get(`/api/feedback?sort=${sort}`).then(res =>setFeedbacks(res.data));return null},
    queryKey: ["get-sortedFeedbacks",sort,votes],
  })

  const ids = feedbacks.map(f => f._id).join(",")
  const {isPending:parentLoadingVotes } = useQuery({
    queryFn: () => {axios.get(`/api/vote?feedbackIds=${ids}`).then(res => setVotes(res.data));return null},
    queryKey: ["get-votes",feedbacks],
  })


  const openFeedbackFormModal = () => {
    if(session.status === "authenticated"){
      setShowFeedbackFormModal(true)
      return
     }else{
      router.push("/signin")
      toast("you are not login Please login first")
     }
  };

  const openFeedbackItemModal = (feedback) => {
    setShowFeedbackItemModal(feedback)
  }

  useEffect(() => {
    if (feedbackData) {
      setFeedbacks(feedbackData)
    }
  },[feedbackData])
  
  useEffect(() => {
    if (feedbackData) {
      setFeedbacks(feedbackData)
    }
  },[feedbackData])




  const updateFeedback = (newData) =>{
    setShowFeedbackItemModal((prev) =>{
      return {...prev,...newData}
    })
  }


  return (
    <main className="bg-white md:shadow-lg rounded-lg mt-8 border overflow-hidden border-solid">
      <div className="bg-purple-300 p-8">
        <h1 className="text-4xl font-bold mb-4">Feedback Board</h1>
        <p className="text-opacity-90">
          Help me deside what should i biuld next or how can i improve
        </p>
      </div>

      <div className="bg-gray-100 flex items-center justify-between mt-4 mb-4  px-8 py-2">
        
        <div className="flex gap-2 items-center">
          <span>sort by:</span>
          <select value={sort} onChange={e => {setSort(e.target.value)}} className="w-[150px] textFeild__input py-[6px]">
              <option value="votes">Most voted</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
          </select>
        </div>

        <Button onClick={openFeedbackFormModal}>Make a sujestion</Button>
      </div>

      <Modal
        isOpen={showFeedbackFormModal}
        onClose={() => setShowFeedbackFormModal(false)}
        title="Make a sujesstion"
      >
        <FeedbackFormModal 
          onClose={() => setShowFeedbackFormModal(false)}
          />
      </Modal>

      <div className={`px-8 pb-8 min-h-96 ${isLoadingFeedbacks && "flex items-center justify-center"}`}>
        {isLoadingFeedbacks ? (
          <Loader width={100} height={100} color="rgb(216 180 254)" />
        ) : (
          <div className="space-y-4">
            {feedbacks?.map((feedback) => (
                <FeedbackItem
                  key={feedback._id}
                  session={session}
                  votes={votes?.filter( v => v.feedbackId === feedback._id )}
                  {...feedback}
                  onOpen={() => openFeedbackItemModal(feedback)}
                  parentLoadingVotes={parentLoadingVotes}
                />  
            ))}
          </div>
        )}
      </div>
 
      <Modal
        isOpen={showFeedbackItemModal}
        onClose={() => setShowFeedbackItemModal(false)}
      >
        <FeedbackItemModal 
          {...showFeedbackItemModal}
          votes={votes}
          onClose={() => setShowFeedbackItemModal(false)}
          onUpdate={updateFeedback}
           />
      </Modal>
    </main>
  );
}

export default HomePage;
