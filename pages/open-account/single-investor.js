import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/router";
import {
  NIGERIAN_STATES,
  NigerianStatesSelect,
} from "../../components/NigerianState";

const SingleInvestor = () => {
  const [uploadSignature, setUploadSignature] = useState(false);
  const [uploadPassport, setUploadPassport] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState();
  const [selectedSignature, setSelectedSignature] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedProof, setSelectedProof] = useState();
  const [activeStep, setActiveStep] = useState(1);
  const [formSteps, setFormSteps] = useState([
    { name: "Personal Information", active: true },
    { name: "Next of Kin", active: false },
    { name: "Address Information", active: false },
    { name: "Upload Document", active: false },
    { name: "Investment Information", active: false },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    other_name: "",
    date_of_birth: "",
    email: "",
    gender: "",
    bvn: "",
    phone: "",
    mothers_name: "",
    occupation: "",
    kin_first_name: "",
    kin_other_name: "",
    kin_last_name: "",
    kin_email: "",
    kin_relationship: "",
    kin_address: "",
    kin_occupation: "",
    kin_phone: "",
    address: "",
    street: "",
    city: "",
    state: "",
    country: "",
    time_frame: "",
    specify: "",
    amount: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();

  const idRef = useRef(null);
  const proofRef = useRef(null);
  const topDiv = useRef();

  useEffect(() => {
    setFormSteps((prev) =>
      prev.map((step, idx) => ({
        ...step,
        active: idx + 1 === activeStep,
      }))
    );
  }, [activeStep]);

  function isAnyValueEmpty(array) {
    return array.some((value) => value.trim() === "");
  }

  function validMail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      mail
    );
  }

  function isBvnValid() {
    return /^\d{11}$/.test(formData.bvn);
  }

  function isPhoneValid(phone) {
    return /^\d{11}$/.test(phone.replace(/[\s\-\+]/g, ""));
  }

  function isValidDate(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date <= new Date();
  }

  function handleNumberInputChange(e, field, maxLength) {
    const value = e.target.value.replace(/\D/g, ""); 
    if (maxLength && value.length > maxLength) return;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrorMsg("");
  }

  function handleTextInputChange(e, field) {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrorMsg("");
  }

  function validateForm(sidebar = false) {
    let currentStep = activeStep;
    setErrorMsg("");

    if (currentStep === 1) {
      const requiredFields = [
        formData.first_name,
        formData.last_name,
        formData.other_name,
        formData.date_of_birth,
        formData.email,
        formData.gender,
        formData.bvn,
        formData.phone,
        formData.mothers_name,
        formData.occupation,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields except title are compulsory");
        return false;
      }
      if (!validMail(formData.email)) {
        setErrorMsg("Please enter a valid email address");
        return false;
      }
      if (!isBvnValid()) {
        setErrorMsg("Note: BVN must be exactly 11 digits");
        return false;
      }
      if (!isPhoneValid(formData.phone)) {
        setErrorMsg("Note: Phone number must be exactly 11 digits");
        return false;
      }
      if (!isValidDate(formData.date_of_birth)) {
        setErrorMsg("Note: Please enter a valid date of birth");
        return false;
      }
    } else if (currentStep === 2) {
      const requiredFields = [
        formData.kin_first_name,
        formData.kin_other_name,
        formData.kin_last_name,
        formData.kin_email,
        formData.kin_relationship,
        formData.kin_address,
        formData.kin_occupation,
        formData.kin_phone,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue!");
        return false;
      }
      if (!validMail(formData.kin_email)) {
        setErrorMsg("Please enter a valid email address for Next of Kin");
        return false;
      }
      if (!isPhoneValid(formData.kin_phone)) {
        setErrorMsg("Note: Next of Kin phone number must be exactly 11 digits");
        return false;
      }
    } else if (currentStep === 3) {
      const requiredFields = [
        formData.address,
        formData.street,
        formData.city,
        formData.state,
        formData.country,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue!");
        return false;
      }
    } else if (currentStep === 4) {
      const maxFileSize = 2 * 1024 * 1024; 
      if (!selectedId) {
        setErrorMsg("Please upload a Means of Identification");
        return false;
      }
      if (selectedId && selectedId.size > maxFileSize) {
        setErrorMsg("Means of Identification file size must not exceed 2MB");
        return false;
      }
      if (!selectedProof) {
        setErrorMsg("Please upload a Proof of Address");
        return false;
      }
      if (selectedProof && selectedProof.size > maxFileSize) {
        setErrorMsg("Proof of Address file size must not exceed 2MB");
        return false;
      }
      if (!selectedSignature) {
        setErrorMsg("Please upload a Signature");
        return false;
      }
      if (selectedSignature && selectedSignature.size > maxFileSize) {
        setErrorMsg("Signature file size must not exceed 2MB");
        return false;
      }
    } else if (currentStep === 5) {
      const requiredFields = [
        formData.time_frame,
        formData.specify,
        formData.amount,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue!");
        return false;
      }
      if (!/^\d*$/.test(formData.amount)) {
        setErrorMsg("Note: Amount must contain only digits");
        return false;
      }
    }

    if (!sidebar) setActiveStep((prev) => prev + 1);
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, preventing default behavior");

    // Validate all steps before submission
    for (let step = 1; step <= 5; step++) {
      setActiveStep(step);
      if (!validateForm(true)) {
        return;
      }
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        (key === "email" || key === "kin_email" || key === "email_address") &&
        typeof formData[key] === "string"
      ) {
        formDataToSubmit.append(key, formData[key].toLowerCase());
      } else if (
        (key === "phone" ||
          key === "kin_phone" ||
          key === "mobile_phone_number" ||
          key === "land_phone_number") &&
        typeof formData[key] === "string"
      ) {
        const cleaned = formData[key].replace(/[\s\-\+]/g, "").trim();
        formDataToSubmit.append(key, cleaned);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    if (selectedSignature) {
      formDataToSubmit.append("signature", selectedSignature);
    }
    if (selectedId) {
      formDataToSubmit.append("means_of_identification_image", selectedId);
    }
    if (selectedProof) {
      formDataToSubmit.append("proof_of_address_image", selectedProof);
    }
    formDataToSubmit.append("created", new Date().toLocaleDateString("en-GB"));
    formDataToSubmit.append("form_category", "Single Investor");

    const sheetMonkeyUrl =
      process.env.NEXT_PUBLIC_SHEET_MONKEY_SINGLE_INVESTOR_URL;

    try {
      setSubmissionStatus("submitting");
      console.log("Sending request to Sheet Monkey");
      const response = await fetch(sheetMonkeyUrl, {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        setSubmissionStatus("success");
        window.location.href = "https://dnamaz-update.vercel.app/success";
      } else {
        const errorText = await response.text();
        throw new Error(
          `Submission failed with status: ${response.status}, Details: ${errorText}`
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMsg(`Failed to submit the form: ${error.message}`);
    }
  };

  return (
    <div className="" ref={topDiv}>
      <Navbar />
      <div className="h-40 w-full"></div>
      <div>
        <div
          onClick={() => {
            if (activeStep > 1) {
              setErrorMsg("");
              setActiveStep((prev) => prev - 1);
            } else {
              router.push("/open-account");
            }
          }}
          className="ml-5 flex items-center gap-2 cursor-pointer sm:w-full max-w-[1200px] mx-auto"
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
            <MdKeyboardBackspace color="white" />
          </div>
          <p>Back</p>
        </div>
        <section className="mt-6 flex gap-10">
          <div className="w-96 hidden sm:block">
            <ul className="flex flex-col px-10 bg-[#eaeaea]">
              {formSteps.map((step, idx) => (
                <li
                  onClick={() => {
                    if (idx < activeStep) {
                      setActiveStep(idx + 1);
                      setErrorMsg("");
                    }
                  }}
                  key={idx}
                  className="cursor-pointer py-6 text-lg leading-snug flex items-center gap-3 border-b border-[gainsboro]"
                >
                  {activeStep >= idx + 1 ? (
                    <img src="/images/completedStep.png" alt="completed step" />
                  ) : (
                    <img
                      src="/images/uncompletedStep.png"
                      alt="uncompleted step"
                    />
                  )}
                  <p
                    className={`${
                      activeStep >= idx + 1 && "text-custom-primary"
                    } font-semibold`}
                  >
                    {step.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mr-5 ml-5 sm:ml-[unset] sm:mr-10 w-full">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
            >
              {/* Descriptive Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-custom-primary mb-4">
                  Single Investor Application Form
                </h1>
              </div>

              {errorMsg && (
                <p className="text-[coral] font-medium text-sm text-center mb-4">
                  {errorMsg}
                </p>
              )}
              {submissionStatus === "submitting" && (
                <p className="text-center text-sm font-medium mb-4">
                  Submitting your form, please wait...
                </p>
              )}
              {submissionStatus === "success" && (
                <p className="text-green-600 font-medium text-sm text-center mb-4">
                  Form submitted successfully! Redirecting...
                </p>
              )}

              {/* Step 1 */}
              {true && (
                <div className={`${activeStep === 1 && "!block"} hidden`}>
                  <h3 className="text-xl text-center font-bold text-custom-primary">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomSelectInput
                      name="title"
                      options={["Title", "Mr", "Mrs", "Master", "Miss"]}
                      value={formData.title}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={(e) => handleTextInputChange(e, "first_name")}
                    />
                    <CustomTextInput
                      required
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) => handleTextInputChange(e, "last_name")}
                    />
                    <CustomTextInput
                      required
                      id="other_name"
                      name="other_name"
                      placeholder="Other Name"
                      value={formData.other_name}
                      onChange={(e) => handleTextInputChange(e, "other_name")}
                    />
                    <div>
                      <input
                        required
                        type="text"
                        onFocus={(e) => {
                          e.target.type = "date";
                        }}
                        onBlur={(e) => {
                          e.target.type = "text";
                          if (!isValidDate(e.target.value)) {
                            setErrorMsg(
                              "Note: Please enter a valid date of birth"
                            );
                          }
                        }}
                        name="date_of_birth"
                        placeholder="Date Of Birth"
                        className="px-3 outline-none border h-[50px] w-full border-custom-primary bg-[#fff]"
                        value={formData.date_of_birth}
                        onChange={(e) => {
                          setErrorMsg("");
                          setFormData((prev) => ({
                            ...prev,
                            date_of_birth: e.target.value,
                          }));
                        }}
                        max={new Date().toISOString().split("T")[0]}
                      />
                      {!isValidDate(formData.date_of_birth) &&
                        formData.date_of_birth && (
                          <p className="text-xs sm:text-sm text-[coral]">
                            <span className="font-medium">Note:</span> Please
                            enter a valid date of birth
                          </p>
                        )}
                    </div>
                    <CustomTextInput
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <CustomSelectInput
                      required
                      name="gender"
                      options={[
                        "select gender",
                        "male",
                        "female",
                        "prefer not to say",
                      ]}
                      value={formData.gender}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                    <div>
                      <CustomTextInput
                        required
                        id="bvn"
                        name="bvn"
                        type="text"
                        placeholder="Bank Verification Number"
                        maxLength={11}
                        value={formData.bvn}
                        onChange={(e) => handleNumberInputChange(e, "bvn", 11)}
                      />
                      {!isBvnValid() && formData.bvn && (
                        <p className="text-xs sm:text-sm text-[coral]">
                          <span className="font-medium">Note:</span> BVN must be
                          exactly 11 digits
                        </p>
                      )}
                    </div>
                    <div>
                      <CustomTextInput
                        required
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        maxLength={11}
                        onChange={(e) =>
                          handleNumberInputChange(e, "phone", 11)
                        }
                      />
                      {!isPhoneValid(formData.phone) && formData.phone && (
                        <p className="text-xs sm:text-sm text-[coral]">
                          <span className="font-medium">Note:</span> Phone
                          number must be exactly 11 digits
                        </p>
                      )}
                    </div>
                    <CustomTextInput
                      required
                      id="mothers_name"
                      name="mothers_name"
                      placeholder="Mother Maiden Name"
                      value={formData.mothers_name}
                      onChange={(e) => handleTextInputChange(e, "mothers_name")}
                    />
                    <CustomTextInput
                      required
                      id="occupation"
                      name="occupation"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={(e) => handleTextInputChange(e, "occupation")}
                    />
                    <div></div>
                    <button
                      onClick={() => {
                        if (validateForm()) {
                          topDiv.current.scrollIntoView();
                        }
                      }}
                      type="button"
                      className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* Step 2 */}
              {true && (
                <div className={`${activeStep === 2 && "!block"} hidden`}>
                  <h3 className="text-xl text-center font-bold text-custom-primary">
                    Next of Kin Info
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="kin_first_name"
                      name="kin_first_name"
                      placeholder="First Name"
                      value={formData.kin_first_name}
                      onChange={(e) =>
                        handleTextInputChange(e, "kin_first_name")
                      }
                    />
                    <CustomTextInput
                      required
                      id="kin_other_name"
                      name="kin_other_name"
                      placeholder="Other Name"
                      value={formData.kin_other_name}
                      onChange={(e) =>
                        handleTextInputChange(e, "kin_other_name")
                      }
                    />
                    <CustomTextInput
                      required
                      id="kin_last_name"
                      name="kin_last_name"
                      placeholder="Last Name"
                      value={formData.kin_last_name}
                      onChange={(e) =>
                        handleTextInputChange(e, "kin_last_name")
                      }
                    />
                    <CustomTextInput
                      required
                      id="kin_email"
                      name="kin_email"
                      placeholder="Email"
                      value={formData.kin_email}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_email: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_relationship"
                      name="kin_relationship"
                      placeholder="Relationship"
                      value={formData.kin_relationship}
                      onChange={(e) =>
                        handleTextInputChange(e, "kin_relationship")
                      }
                    />
                    <CustomTextInput
                      required
                      id="kin_address"
                      name="kin_address"
                      placeholder="Home Address"
                      value={formData.kin_address}
                      onChange={(e) => handleTextInputChange(e, "kin_address")}
                    />
                    <CustomTextInput
                      required
                      id="kin_occupation"
                      name="kin_occupation"
                      placeholder="Occupation"
                      value={formData.kin_occupation}
                      onChange={(e) =>
                        handleTextInputChange(e, "kin_occupation")
                      }
                    />
                    <div>
                      <CustomTextInput
                        required
                        id="kin_phone"
                        name="kin_phone"
                        placeholder="Mobile Number"
                        type="text"
                        value={formData.kin_phone}
                        maxLength={11}
                        onChange={(e) =>
                          handleNumberInputChange(e, "kin_phone", 11)
                        }
                      />
                      {!isPhoneValid(formData.kin_phone) &&
                        formData.kin_phone && (
                          <p className="text-xs sm:text-sm text-[coral]">
                            <span className="font-medium">Note:</span> Phone
                            number must be exactly 11 digits
                          </p>
                        )}
                    </div>
                    <button
                      onClick={() => {
                        if (validateForm()) {
                          topDiv.current.scrollIntoView();
                        }
                      }}
                      type="button"
                      className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* Step 3 */}
              {true && (
                <div className={`${activeStep === 3 && "!block"} hidden`}>
                  <h3 className="text-xl text-center font-bold text-custom-primary">
                    Address Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => handleTextInputChange(e, "address")}
                    />
                    <CustomTextInput
                      required
                      id="street"
                      name="street"
                      placeholder="Street"
                      value={formData.street}
                      onChange={(e) => handleTextInputChange(e, "street")}
                    />
                    <CustomTextInput
                      required
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleTextInputChange(e, "city")}
                    />
                    <NigerianStatesSelect
                      required
                      value={formData.state}
                      onChange={(value) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          state: value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => handleTextInputChange(e, "country")}
                    />
                    <div></div>
                    <button
                      onClick={() => {
                        if (validateForm()) {
                          topDiv.current.scrollIntoView();
                        }
                      }}
                      type="button"
                      className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* Step 4 */}
              {true && (
                <div className={`${activeStep === 4 && "!block"} hidden`}>
                  <h3 className="text-xl text-center font-bold text-custom-primary">
                    Document Upload
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <CustomSelectInput
                        required
                        idRef={idRef}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        name="means_of_identification"
                        options={[
                          "Means of Identification",
                          "International Passport",
                          "NIN",
                        ]}
                      />
                      <div className="hidden">
                        <input
                          required
                          className="hidden"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          id="means_of_id"
                          name="means_of_identification_image"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size > 2 * 1024 * 1024) {
                              setErrorMsg(
                                "Means of Identification file size must not exceed 2MB"
                              );
                              setSelectedId(null);
                            } else {
                              setSelectedId(file);
                              setErrorMsg("");
                            }
                          }}
                        />
                        <label
                          ref={idRef}
                          htmlFor="means_of_id"
                          className="hidden"
                        >
                          Means of Identification Image
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Accepted formats: JPG, PNG (Max 2MB)
                      </p>
                    </div>
                    <div>
                      <CustomSelectInput
                        required
                        proofRef={proofRef}
                        selectedProof={selectedProof}
                        setSelectedProof={setSelectedProof}
                        name="proof_of_address"
                        options={[
                          "Proof of Address",
                          "Utility Bill",
                          "Tenancy Agreement",
                        ]}
                      />
                      <div className="hidden">
                        <input
                          required
                          className="hidden"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          hidden
                          id="proof_of_address"
                          name="proof_of_address"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size > 2 * 1024 * 1024) {
                              setErrorMsg(
                                "Proof of Address file size must not exceed 2MB"
                              );
                              setSelectedProof(null);
                            } else {
                              setSelectedProof(file);
                              setErrorMsg("");
                            }
                          }}
                        />
                        <label
                          ref={proofRef}
                          htmlFor="proof_of_address"
                          className="hidden"
                        >
                          Proof of Address
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Accepted formats: JPG, PNG (Max 2MB)
                      </p>
                    </div>
                    <div>
                      <input
                        hidden
                        type="file"
                        name="signature"
                        accept="image/png, image/jpg, image/jpeg"
                        id="signature"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 2 * 1024 * 1024) {
                            setErrorMsg(
                              "Signature file size must not exceed 2MB"
                            );
                            setSelectedSignature(null);
                          } else {
                            setSelectedSignature(file);
                            setErrorMsg("");
                          }
                        }}
                      />
                      <label htmlFor="signature">
                        <div
                          role="button"
                          className="bg-[#fff] flex justify-between items-center border border-custom-primary text-left w-full p-3"
                        >
                          Signature Upload
                          {selectedSignature && (
                            <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedSignature.name.slice(
                              0,
                              15
                            )})`}</span>
                          )}
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Accepted formats: JPG, PNG (Max 2MB)
                      </p>
                    </div>
                    <div></div>
                    <button
                      onClick={() => {
                        if (validateForm()) {
                          topDiv.current.scrollIntoView();
                        }
                      }}
                      type="button"
                      className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* Step 5 */}
              {true && (
                <div className={`${activeStep === 5 && "!block"} hidden`}>
                  <h3 className="text-xl text-center font-bold text-custom-primary">
                    Investment Info
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomSelectInput
                      required
                      name="time_frame"
                      options={[
                        "Time Frame",
                        "Short Term (Less than or equal to 1 year)",
                        "Mid-Term (More than 1 year - less than 5yrs)",
                        "Long Term (More than 5 less - than 10yrs)",
                      ]}
                      value={formData.time_frame}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          time_frame: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="specify"
                      name="specify"
                      placeholder="Specify"
                      value={formData.specify}
                      onChange={(e) => handleTextInputChange(e, "specify")}
                    />
                    <CustomTextInput
                      required
                      id="amount"
                      name="amount"
                      placeholder="Amount (₦)"
                      type="text"
                      value={formData.amount}
                      onChange={(e) => handleNumberInputChange(e, "amount")}
                    />
                    <div></div>
                    <button
                      type="submit"
                      disabled={submissionStatus === "submitting"}
                      className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium disabled:opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

const CustomTextInput = ({
  placeholder,
  name,
  id,
  type,
  required,
  value,
  onChange,
  maxLength,
}) => {
  return (
    <div className="w-full">
      <input
        required={required}
        className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
        name={name}
        id={id}
        placeholder={placeholder}
        type={type || "text"}
        autoComplete="new-password"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
};

const CustomSelectInput = ({
  options,
  name,
  idRef,
  proofRef,
  selectedId,
  setSelectedId,
  selectedProof,
  setSelectedProof,
  required,
  onChange,
  value,
}) => {
  return (
    <div className="relative">
      <select
        required={required}
        name={name}
        value={value}
        onChange={(e) => {
          if (name === "proof_of_address") {
            setSelectedProof(e.target.value);
            proofRef.current.click();
          } else if (name === "means_of_identification") {
            setSelectedId(e.target.value);
            idRef.current.click();
          } else {
            onChange(e);
          }
        }}
        className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
      >
        {options.map((item, idx) => (
          <option key={idx} value={item} className="capitalize">
            {item}
          </option>
        ))}
      </select>
      <p className="italic text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-5 sm:right-10">
        {name === "proof_of_address" && selectedProof?.name
          ? `${selectedProof.name.slice(0, 15)}`
          : name === "means_of_identification" && selectedId?.name
          ? `${selectedId.name.slice(0, 15)}`
          : null}
      </p>
    </div>
  );
};

export default SingleInvestor;




// import React, { useRef, useState, useEffect } from "react";
// import { MdKeyboardBackspace } from "react-icons/md";
// import Footer from "../../components/Footer/Footer";
// import Navbar from "../../components/Navbar/Navbar";
// import { useRouter } from "next/router";

// const SingleInvestor = () => {
//   const [uploadSignature, setUploadSignature] = useState(false);
//   const [uploadPassport, setUploadPassport] = useState(false);
//   const [selectedPassport, setSelectedPassport] = useState();
//   const [selectedSignature, setSelectedSignature] = useState();
//   const [selectedId, setSelectedId] = useState();
//   const [selectedProof, setSelectedProof] = useState();
//   const [activeStep, setActiveStep] = useState(1);
//   const [formSteps, setFormSteps] = useState([
//     { name: "Personal Information", active: true },
//     { name: "Next of Kin", active: false },
//     { name: "Address Information", active: false },
//     { name: "Upload Document", active: false },
//     { name: "Investment Information", active: false },
//   ]);
//   const [formData, setFormData] = useState({
//     title: "",
//     first_name: "",
//     last_name: "",
//     other_name: "",
//     date_of_birth: "",
//     email: "",
//     gender: "",
//     bvn: "",
//     phone: "",
//     mothers_name: "",
//     occupation: "",
//     kin_first_name: "",
//     kin_other_name: "",
//     kin_last_name: "",
//     kin_email: "",
//     kin_relationship: "",
//     kin_address: "",
//     kin_occupation: "",
//     kin_phone: "",
//     address: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     time_frame: "",
//     specify: "",
//     amount: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [submissionStatus, setSubmissionStatus] = useState(null);
//   const router = useRouter();

//   const idRef = useRef(null);
//   const proofRef = useRef(null);
//   const topDiv = useRef();

//   useEffect(() => {
//     setFormSteps((prev) =>
//       prev.map((step, idx) => ({
//         ...step,
//         active: idx + 1 === activeStep,
//       }))
//     );
//   }, [activeStep]);

//   function isAnyValueEmpty(array) {
//     return array.some((value) => value.trim() === "");
//   }

//   function validMail(mail) {
//     return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
//       mail
//     );
//   }

//   function isBvnValid() {
//     const bvnLength = formData.bvn.length;
//     return bvnLength === 11;
//   }

//   function isPhoneValid(phone) {
//     const numericPhone = phone.replace(/\D/g, "");
//     return numericPhone.length >= 10;
//   }

//   function isDigitsOnly(value) {
//     return /^\d*$/.test(value);
//   }

//   function handleNumberInputChange(e, field) {
//     const value = e.target.value;
//     if (isDigitsOnly(value)) {
//       setFormData((prev) => ({
//         ...prev,
//         [field]: value,
//       }));
//       setErrorMsg("");
//     }
//   }

//   function validateForm(sidebar = false) {
//     let currentStep = activeStep;
//     setErrorMsg("");

//     if (currentStep === 1) {
//       const requiredFields = [
//         formData.first_name,
//         formData.last_name,
//         formData.other_name,
//         formData.date_of_birth,
//         formData.email,
//         formData.gender,
//         formData.bvn,
//         formData.phone,
//         formData.mothers_name,
//         formData.occupation,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("Note: All fields except title are compulsory");
//         return false;
//       }
//       if (!validMail(formData.email)) {
//         setErrorMsg("Please enter a valid email address");
//         return false;
//       }
//       if (!isBvnValid()) {
//         setErrorMsg("Note: BVN must be exactly 11 digits");
//         return false;
//       }
//       if (!isPhoneValid(formData.phone)) {
//         setErrorMsg("Note: Phone number must be at least 10 digits");
//         return false;
//       }
//       if (!isDigitsOnly(formData.bvn)) {
//         setErrorMsg("Note: BVN must contain only digits");
//         return false;
//       }
//       if (!isDigitsOnly(formData.phone)) {
//         setErrorMsg("Note: Phone number must contain only digits");
//         return false;
//       }
//     } else if (currentStep === 2) {
//       const requiredFields = [
//         formData.kin_first_name,
//         formData.kin_other_name,
//         formData.kin_last_name,
//         formData.kin_email,
//         formData.kin_relationship,
//         formData.kin_address,
//         formData.kin_occupation,
//         formData.kin_phone,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue!");
//         return false;
//       }
//       if (!validMail(formData.kin_email)) {
//         setErrorMsg("Please enter a valid email address for Next of Kin");
//         return false;
//       }
//       if (!isPhoneValid(formData.kin_phone)) {
//         setErrorMsg(
//           "Note: Next of Kin phone number must be at least 10 digits"
//         );
//         return false;
//       }
//       if (!isDigitsOnly(formData.kin_phone)) {
//         setErrorMsg("Note: Next of Kin phone number must contain only digits");
//         return false;
//       }
//     } else if (currentStep === 3) {
//       const requiredFields = [
//         formData.address,
//         formData.street,
//         formData.city,
//         formData.state,
//         formData.country,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue!");
//         return false;
//       }
//     } else if (currentStep === 4) {
//       if (!selectedId) {
//         setErrorMsg("Please upload a Means of Identification");
//         return false;
//       }
//       if (!selectedProof) {
//         setErrorMsg("Please upload a Proof of Address");
//         return false;
//       }
//       if (!selectedSignature) {
//         setErrorMsg("Please upload a Signature");
//         return false;
//       }
//     } else if (currentStep === 5) {
//       const requiredFields = [
//         formData.time_frame,
//         formData.specify,
//         formData.amount,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue!");
//         return false;
//       }
//       if (!isDigitsOnly(formData.amount)) {
//         setErrorMsg("Note: Amount must contain only digits");
//         return false;
//       }
//     }

//     if (!sidebar) setActiveStep((prev) => prev + 1);
//     return true;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted, preventing default behavior");

//     // Validate all steps before submission
//     for (let step = 1; step <= 5; step++) {
//       setActiveStep(step);
//       if (!validateForm(true)) {
//         return;
//       }
//     }

//     const formDataToSubmit = new FormData();
//     Object.keys(formData).forEach((key) => {
//       // formDataToSubmit.append(key, formData[key]);
//       if (
//         (key === "email" || key === "kin_email" || key === "email_address") &&
//         typeof formData[key] === "string"
//       ) {
//         formDataToSubmit.append(key, formData[key].toLowerCase());
//       } else if (
//         (key === "phone" ||
//           key === "kin_phone" ||
//           key === "mobile_phone_number" ||
//           key === "land_phone_number") &&
//         typeof formData[key] === "string"
//       ) {
//         const cleaned = formData[key].replace(/[\s\-\+]/g, "").trim();
//         formDataToSubmit.append(key, cleaned);
//       } else {
//         formDataToSubmit.append(key, formData[key]);
//       }
//     });
//     if (selectedSignature) {
//       formDataToSubmit.append("signature", selectedSignature);
//     }
//     if (selectedId) {
//       formDataToSubmit.append("means_of_identification_image", selectedId);
//     }
//     if (selectedProof) {
//       formDataToSubmit.append("proof_of_address_image", selectedProof);
//     }
//     formDataToSubmit.append("created", new Date().toLocaleDateString("en-GB"));
//     formDataToSubmit.append("form_category", "Single Investor");

//     const sheetMonkeyUrl =
//       process.env.NEXT_PUBLIC_SHEET_MONKEY_SINGLE_INVESTOR_URL;

//     try {
//       setSubmissionStatus("submitting");
//       console.log("Sending request to Sheet Monkey");
//       const response = await fetch(sheetMonkeyUrl, {
//         method: "POST",
//         body: formDataToSubmit,
//       });

//       if (response.ok) {
//         setSubmissionStatus("success");

//         window.location.href = "https://dnamaz-update.vercel.app/success";
//       } else {
//         const errorText = await response.text();
//         throw new Error(
//           `Submission failed with status: ${response.status}, Details: ${errorText}`
//         );
//       }
//     } catch (error) {
//       setSubmissionStatus("error");
//       setErrorMsg(`Failed to submit the form: ${error.message}`);
//     }
//   };

//   return (
//     <div className="" ref={topDiv}>
//       <Navbar />
//       <div className="h-40 w-full"></div>
//       <div>
//         <div
//           onClick={() => {
//             if (activeStep > 1) {
//               setErrorMsg("");
//               setActiveStep((prev) => prev - 1);
//             } else {
//               router.push("/open-account");
//             }
//           }}
//           className="ml-5 flex items-center gap-2 cursor-pointer sm:w-full max-w-[1200px] mx-auto"
//         >
//           <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
//             <MdKeyboardBackspace color="white" />
//           </div>
//           <p>Back</p>
//         </div>
//         <section className="mt-14 flex gap-10">
//           <div className="w-96 hidden sm:block">
//             <ul className="flex flex-col px-10 bg-[#eaeaea]">
//               {formSteps.map((step, idx) => (
//                 <li
//                   onClick={() => {
//                     if (idx < activeStep) {
//                       setActiveStep(idx + 1);
//                       setErrorMsg("");
//                     }
//                   }}
//                   key={idx}
//                   className="cursor-pointer py-6 text-lg leading-snug flex items-center gap-3 border-b border-[gainsboro]"
//                 >
//                   {activeStep >= idx + 1 ? (
//                     <img src="/images/completedStep.png" alt="completed step" />
//                   ) : (
//                     <img
//                       src="/images/uncompletedStep.png"
//                       alt="uncompleted step"
//                     />
//                   )}
//                   <p
//                     className={`${
//                       activeStep >= idx + 1 && "text-custom-primary"
//                     } font-semibold`}
//                   >
//                     {step.name}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mr-5 ml-5 sm:ml-[unset] sm:mr-10 w-full">
//             <form
//               onSubmit={handleSubmit}
//               encType="multipart/form-data"
//               className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
//             >
//               {errorMsg && (
//                 <p className="text-[coral] font-medium text-sm text-center mb-4">
//                   {errorMsg}
//                 </p>
//               )}
//               {submissionStatus === "submitting" && (
//                 <p className="text-center text-sm font-medium mb-4">
//                   Submitting your form, please wait...
//                 </p>
//               )}
//               {submissionStatus === "success" && (
//                 <p className="text-green-600 font-medium text-sm text-center mb-4">
//                   Form submitted successfully! Redirecting...
//                 </p>
//               )}

//               {/* Step 1 */}
//               {true && (
//                 <div className={`${activeStep === 1 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Personal Information
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomSelectInput
//                       name="title"
//                       options={["Title", "Mr", "Mrs", "Master", "Miss"]}
//                       value={formData.title}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           title: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="first_name"
//                       name="first_name"
//                       placeholder="First Name"
//                       value={formData.first_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           first_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="last_name"
//                       name="last_name"
//                       placeholder="Last Name"
//                       value={formData.last_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           last_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="other_name"
//                       name="other_name"
//                       placeholder="Other Name"
//                       value={formData.other_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           other_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <input
//                       required
//                       type="text"
//                       onFocus={(e) => {
//                         e.target.type = "date";
//                       }}
//                       onBlur={(e) => {
//                         e.target.type = "text";
//                       }}
//                       name="date_of_birth"
//                       placeholder="Date Of Birth"
//                       className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                       value={formData.date_of_birth}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           date_of_birth: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="Email Address"
//                       value={formData.email}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           email: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomSelectInput
//                       required
//                       name="gender"
//                       options={[
//                         "select gender",
//                         "male",
//                         "female",
//                         "prefer not to say",
//                       ]}
//                       value={formData.gender}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           gender: e.target.value,
//                         }));
//                       }}
//                     />
//                     <div>
//                       <CustomTextInput
//                         required
//                         id="bvn"
//                         name="bvn"
//                         type="text"
//                         placeholder="Bank Verification Number"
//                         maxLength={11}
//                         value={formData.bvn}
//                         onChange={(e) => handleNumberInputChange(e, "bvn")}
//                       />
//                       {!isBvnValid() && formData.bvn && (
//                         <p className="text-xs sm:text-sm text-[coral]">
//                           <span className="font-medium">Note:</span> BVN must be
//                           exactly 11 digits
//                         </p>
//                       )}
//                     </div>
//                     <CustomTextInput
//                       required
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       placeholder="Phone Number"
//                       value={formData.phone}
//                       maxLength={14}
//                       onChange={(e) => handleNumberInputChange(e, "phone")}
//                     />
//                     <CustomTextInput
//                       required
//                       id="mothers_name"
//                       name="mothers_name"
//                       placeholder="Mother Maiden Name"
//                       value={formData.mothers_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           mothers_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="occupation"
//                       name="occupation"
//                       placeholder="Occupation"
//                       value={formData.occupation}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           occupation: e.target.value,
//                         }));
//                       }}
//                     />
//                     <div></div>
//                     <button
//                       onClick={() => {
//                         if (validateForm()) {
//                           topDiv.current.scrollIntoView();
//                         }
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* Step 2 */}
//               {true && (
//                 <div className={`${activeStep === 2 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Next of Kin Info
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="kin_first_name"
//                       name="kin_first_name"
//                       placeholder="First Name"
//                       value={formData.kin_first_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_first_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_other_name"
//                       name="kin_other_name"
//                       placeholder="Other Name"
//                       value={formData.kin_other_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_other_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_last_name"
//                       name="kin_last_name"
//                       placeholder="Last Name"
//                       value={formData.kin_last_name}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_last_name: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_email"
//                       name="kin_email"
//                       placeholder="Email"
//                       value={formData.kin_email}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_email: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_relationship"
//                       name="kin_relationship"
//                       placeholder="Relationship"
//                       value={formData.kin_relationship}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_relationship: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_address"
//                       name="kin_address"
//                       placeholder="Home Address"
//                       value={formData.kin_address}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_address: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_occupation"
//                       name="kin_occupation"
//                       placeholder="Occupation"
//                       value={formData.kin_occupation}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kin_occupation: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="kin_phone"
//                       name="kin_phone"
//                       placeholder="Mobile Number"
//                       type="text"
//                       value={formData.kin_phone}
//                       onChange={(e) => handleNumberInputChange(e, "kin_phone")}
//                     />
//                     <button
//                       onClick={() => {
//                         if (validateForm()) {
//                           topDiv.current.scrollIntoView();
//                         }
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* Step 3 */}
//               {true && (
//                 <div className={`${activeStep === 3 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Address Information
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="address"
//                       name="address"
//                       placeholder="Address"
//                       value={formData.address}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           address: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="street"
//                       name="street"
//                       placeholder="Street"
//                       value={formData.street}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           street: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="city"
//                       name="city"
//                       placeholder="City"
//                       value={formData.city}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           city: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="state"
//                       name="state"
//                       placeholder="State"
//                       value={formData.state}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           state: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="country"
//                       name="country"
//                       placeholder="Country"
//                       value={formData.country}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           country: e.target.value,
//                         }));
//                       }}
//                     />
//                     <div></div>
//                     <button
//                       onClick={() => {
//                         if (validateForm()) {
//                           topDiv.current.scrollIntoView();
//                         }
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* Step 4 */}
//               {true && (
//                 <div className={`${activeStep === 4 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Document Upload
//                   </h3>

//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <div>
//                       <CustomSelectInput
//                         required
//                         idRef={idRef}
//                         selectedId={selectedId}
//                         setSelectedId={setSelectedId}
//                         name="means_of_identification"
//                         options={[
//                           "Means of Identification",
//                           "International Passport",
//                           "NIN",
//                         ]}
//                       />
//                       <div className="hidden">
//                         <input
//                           required
//                           className="hidden"
//                           type="file"
//                           accept="image/png, image/jpg, image/jpeg"
//                           id="means_of_id"
//                           name="means_of_identification_image"
//                           onChange={(e) => setSelectedId(e.target.files[0])}
//                         />
//                         <label
//                           ref={idRef}
//                           htmlFor="means_of_id"
//                           className="hidden"
//                         >
//                           Means of Identification Image
//                         </label>
//                       </div>
//                     </div>
//                     <div>
//                       <CustomSelectInput
//                         required
//                         proofRef={proofRef}
//                         selectedProof={selectedProof}
//                         setSelectedProof={setSelectedProof}
//                         name="proof_of_address"
//                         options={[
//                           "Proof of Address",
//                           "Utility Bill",
//                           "Tenancy Agreement",
//                         ]}
//                       />
//                       <div className="hidden">
//                         <input
//                           required
//                           className="hidden"
//                           // ref={proofRef}
//                           type="file"
//                           accept="image/png, image/jpg, image/jpeg"
//                           hidden
//                           id="proof_of_address"
//                           name="proof_of_address"
//                           onChange={(e) => setSelectedProof(e.target.files[0])}
//                         />
//                         <label
//                           ref={proofRef}
//                           htmlFor="proof_of_address"
//                           className="hidden"
//                         >
//                           Proof of Address
//                         </label>
//                       </div>
//                     </div>
//                     <div>
//                       <input
//                         hidden
//                         type="file"
//                         name="signature"
//                         accept="image/png, image/jpg, image/jpeg"
//                         id="signature"
//                         onChange={(e) =>
//                           setSelectedSignature(e.target.files[0])
//                         }
//                       />
//                       <label htmlFor="signature">
//                         <div
//                           role="button"
//                           className="bg-[#fff] flex justify-between items-center border border-custom-primary text-left w-full p-3"
//                         >
//                           Signature Upload
//                           {selectedSignature && (
//                             <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedSignature.name.slice(
//                               0,
//                               15
//                             )})`}</span>
//                           )}
//                         </div>
//                       </label>
//                     </div>
//                     <div></div>
//                     <button
//                       onClick={() => {
//                         if (validateForm()) {
//                           topDiv.current.scrollIntoView();
//                         }
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* Step 5 */}
//               {true && (
//                 <div className={`${activeStep === 5 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Investment Info
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomSelectInput
//                       required
//                       name="time_frame"
//                       options={[
//                         "Time Frame",
//                         "Short Term (Less than or equal to 1 year)",
//                         "Mid-Term (More than 1 year - less than 5yrs)",
//                         "Long Term (More than 5 less - than 10yrs)",
//                       ]}
//                       value={formData.time_frame}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           time_frame: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="specify"
//                       name="specify"
//                       placeholder="Specify"
//                       value={formData.specify}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           specify: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="amount"
//                       name="amount"
//                       placeholder="Amount (₦)"
//                       type="text"
//                       value={formData.amount}
//                       onChange={(e) => handleNumberInputChange(e, "amount")}
//                     />
//                     <div></div>
//                     <button
//                       type="submit"
//                       disabled={submissionStatus === "submitting"}
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium disabled:opacity-50"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         </section>
//       </div>
//       <div className="mt-20">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// const CustomTextInput = ({
//   placeholder,
//   name,
//   id,
//   type,
//   required,
//   value,
//   onChange,
//   maxLength,
// }) => {
//   return (
//     <div className="w-full">
//       <input
//         required={required}
//         className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
//         name={name}
//         id={id}
//         placeholder={placeholder}
//         type={type || "text"}
//         autoComplete="new-password"
//         value={value}
//         onChange={onChange}
//         maxLength={maxLength}
//       />
//     </div>
//   );
// };

// const CustomSelectInput = ({
//   options,
//   name,
//   idRef,
//   proofRef,
//   selectedId,
//   setSelectedId,
//   selectedProof,
//   setSelectedProof,
//   required,
//   onChange,
//   value,
// }) => {
//   return (
//     <div className="relative">
//       <select
//         required={required}
//         name={name}
//         value={value}
//         onChange={(e) => {
//           if (name === "proof_of_address") {
//             setSelectedProof(e.target.value);
//             proofRef.current.click();
//           } else if (name === "means_of_identification") {
//             setSelectedId(e.target.value);
//             idRef.current.click();
//           } else {
//             onChange(e);
//           }
//         }}
//         className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
//       >
//         {options.map((item, idx) => (
//           <option key={idx} value={item} className="capitalize">
//             {item}
//           </option>
//         ))}
//       </select>
//       <p className="italic text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-5 sm:right-10">
//         {name === "proof_of_address" && selectedProof?.name
//           ? `${selectedProof.name.slice(0, 15)}`
//           : name === "means_of_identification" && selectedId?.name
//           ? `${selectedId.name.slice(0, 15)}`
//           : null}
//       </p>
//     </div>
//   );
// };

// export default SingleInvestor;
