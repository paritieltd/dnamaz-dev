import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/router";

function Modal({ isOpen, onClose }) {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScrollPosition(window.pageYOffset);
      setModalOpen(true);
    } else {
      setModalOpen(false);
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-[#000000]/[0.16] bg-opacity-75 flex items-center overflow-y-hidden w-[100vw] h-[100vh] left-0 right-0 top-0 bottom-0 justify-center z-[200000]">
          <div
            className="bg-white w-[90%] md:w-[80%] lg:w-[70%] rounded-xl p-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center mb-6">
              With our Murabaha Assets Financing, we can help you finance the
              purchase of any asset of your choice with a flexible repayment
              plan that allows you to pay back in installments over a specified
              period of time.
            </p>
            <p className="text-center mb-6">
              We purchase the asset on your behalf from your desired vendor or
              any of our pool of vendors at a mark-up (profit), which would be a
              fraction of the value of the asset to be purchased.
            </p>
            <div className="flex justify-center">
            <button
              className="mx-4 px-4 py-2 bg-[#1D5506] text-white rounded-md"
              onClick={() => router.push("/open-account")}
            >
              Continue
            </button>
            <button
              className="mx-4 px-4 py-2 bg-[#1D5506] text-white rounded-md"
              onClick={handleClose}
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
      <div className={`${modalOpen ? `${styles.modalOpen}` : ""}`}>
        {/* Rest of the app */}
      </div>
    </>
  );
}

export default Modal;
