import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";

const DownloadProspect = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleDownload = () => {
    setIsDownloaded(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setErrorMsg("❌ Only PDF files are allowed!");
      return;
    }

    setErrorMsg("");
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMsg("Please upload a file before submitting!");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <Navbar />

      <div className="h-40 w-full"></div>

      <div
        onClick={() => router.push("/open-account")}
        className="ml-5 flex items-center gap-2 cursor-pointer sm:w-full max-w-[1200px] mx-auto"
      >
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
          <MdKeyboardBackspace color="white" />
        </div>
        <p>Back</p>
      </div>

      <div className="max-w-lg mx-auto p-6 flex flex-col gap-8 items-center text-center border rounded-lg shadow-md mt-10">
        <h2 className="text-2xl text-primary font-bold mb-4">
          Download & Upload Form
        </h2>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <a
          href="/forms/DNAMAZ HALAL FUND PROSPECTUS.pdf"
          download="DNAMAZ HALAL FUND PROSPECTUS FORM"
          onClick={handleDownload}
          className="hover:bg-custom-primary py-5 hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
        >
          📥 Download Document
        </a>

        {isDownloaded && (
          <div className="mt-4 w-full flex flex-col items-center">
            <label className="block font-semibold mb-2 py-5">
              Upload File:
            </label>

            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            <label
              htmlFor="fileInput"
              className="cursor-pointer hover:bg-custom-primary py-5 hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              📤 Choose File
            </label>

            {file && (
              <p className="mt-2 text-green-600 font-medium">✅ {file.name}</p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            file
              ? "hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>

      <div className="py-10"></div>
      <Footer />
    </div>
  );
};

export default DownloadProspect;
