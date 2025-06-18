import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import {
  NIGERIAN_STATES,
  NigerianStatesSelect,
} from "../../components/NigerianState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HalalFixed = () => {
  const [uploadSignature, setUploadSignature] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [formSteps, setFormSteps] = useState([
    { name: "1. Personal/Company Info", active: true },
    { name: "2. Joint Applicant", active: false },
    { name: "3. Income Distribution", active: false },
    { name: "4. Bank Details (for e-Dividend/Distribution)", active: false },
    { name: "5. Upload Documents", active: false },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    title_joint: "",
    surname: "",
    surname_joint: "",
    other_names: "",
    other_names_2: "",
    amount_paid: "",
    number_of_units: "",
    payment_method: "",
    date_of_registration: null,
    postal_address: "",
    city: "",
    state: "",
    land_phone_number: "",
    mobile_phone_number: "",
    email_address: "",
    clearing_house_number: "",
    name_of_stockbroker: "",
    bank_name: "",
    branch_name: "",
    bvn: "",
    tin: "",
    account_number: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();
  const topDiv = useRef();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFormSteps((prev) =>
      prev.map((step, idx) => ({
        ...step,
        active: idx + 1 === activeStep,
      }))
    );
  }, [activeStep]);

  // Validation functions
  const validMail = (email) =>
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      email
    );

  const isBvnValid = () => /^\d{11}$/.test(formData.bvn);
  const isTinValid = () => /^\d{10}$/.test(formData.tin);
  const isAccountNumberValid = () => /^\d{10}$/.test(formData.account_number);
  const isPhoneValid = (phone) =>
    /^\d{11}$/.test(phone.replace(/[\s\-\+]/g, ""));

  // const isAnyValueEmpty = (values) =>
  //   values.some((value) => value.trim() === "");

  const isAnyValueEmpty = (array) => {
    return array.some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return value === null || value === undefined;
    });
  };

  function handleAmountInputChange(e) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (!value) {
      setFormData((prev) => ({ ...prev, amount_paid: "" }));
      return;
    }
    value = value.replace(/^0+/, "") || "0";
    const withCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormData((prev) => ({
      ...prev,
      amount_paid: `₦${withCommas}`,
    }));
    setErrorMsg("");
  }

  function handleAmountBlur(e) {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (!value) {
      setFormData((prev) => ({ ...prev, amount_paid: "" }));
      return;
    }
    value = value.replace(/^0+/, "") || "0";
    const withCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormData((prev) => ({
      ...prev,
      amount_paid: `₦${withCommas}.00`,
    }));
  }

  // Improved date validation
  const isValidDate = (dateString) => {
    if (!dateString) return false;
    // const date = new Date(dateString);
    if (!(dateString instanceof Date)) return false;
    return !isNaN(dateString.getTime()) && dateString <= new Date();
  };

  // Format date to DD/MM/YYYY
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateForm = (sidebar = false) => {
    let currentStep = activeStep;
    setErrorMsg("");

    if (currentStep === 1) {
      const requiredFields = [
        formData.title,
        formData.surname,
        formData.other_names,
        formData.amount_paid,
        formData.date_of_registration,
        formData.postal_address,
        formData.city,
        formData.state,
        formData.number_of_units,
        formData.land_phone_number,
        formData.mobile_phone_number,
        formData.email_address,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg(
          "All fields are required except Clearing House Number and Name of Stockbroker."
        );
        return false;
      }
      if (!validMail(formData.email_address)) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
      if (!isPhoneValid(formData.land_phone_number)) {
        setErrorMsg("Land phone number must be 11 digits.");
        return false;
      }
      if (!isPhoneValid(formData.mobile_phone_number)) {
        setErrorMsg("Mobile phone number must be 11 digits.");
        return false;
      }
      if (!isValidDate(formData.date_of_registration)) {
        setErrorMsg(
          "Please enter a valid date of registration (not in the future)."
        );
        return false;
      }
    } else if (currentStep === 2) {
      const requiredFields = [formData.title_joint, formData.surname_joint];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("All fields are compulsory. Fill to continue!");
        return false;
      }
    } else if (currentStep === 3) {
      const requiredFields = [formData.payment_method, formData.other_names_2];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("All fields are compulsory. Fill to continue!");
        return false;
      }
    } else if (currentStep === 4) {
      const requiredFields = [
        formData.bank_name,
        formData.branch_name,
        formData.bvn,
        formData.tin,
        formData.account_number,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("All fields are compulsory. Fill to continue!");
        return false;
      }
      if (!isBvnValid()) {
        setErrorMsg("BVN must be exactly 11 digits.");
        return false;
      }
      if (!isTinValid()) {
        setErrorMsg("TIN must be exactly 10 digits.");
        return false;
      }
      if (!isAccountNumberValid()) {
        setErrorMsg("Account Number must be exactly 10 digits.");
        return false;
      }
    } else if (currentStep === 5) {
      const maxFileSize = 2 * 1024 * 1024;
      if (!selectedSignature) {
        setErrorMsg("Please upload a signature or thumbprint.");
        return false;
      }
      if (selectedSignature && selectedSignature.size > maxFileSize) {
        setErrorMsg("Signature file size must not exceed 2MB.");
        return false;
      }
    }

    if (!sidebar) setActiveStep((prev) => prev + 1);
    return true;
  };

  // Phone validation messages
  const isLandPhoneValid = () => isPhoneValid(formData.land_phone_number);
  const isMobilePhoneValid = () => isPhoneValid(formData.mobile_phone_number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, preventing default behavior");

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
      } else if (key === "date_of_registration" && formData[key]) {
        formDataToSubmit.append(key, formatDateToDDMMYYYY(formData[key]));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    if (selectedSignature) {
      formDataToSubmit.append("signature", selectedSignature);
    }
    formDataToSubmit.append("created", new Date().toLocaleDateString("en-GB"));
    formDataToSubmit.append("form_category", "Halal Fixed Income");

    const sheetMonkeyUrl =
      process.env.NEXT_PUBLIC_SHEET_MONKEY_HALAL_FIXED_INCOME_FUND_URL;

    try {
      setSubmissionStatus("submitting");
      console.log("Sending request to Sheet Monkey");
      const response = await fetch(sheetMonkeyUrl, {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        setSubmissionStatus("success");
        router.replace("/success");
        // window.location.href = "https://dnamaz-update.vercel.app/success";
      } else {
        throw new Error("Submission failed with status: " + response.status);
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMsg("Failed to submit the form. Please try again later.");
    }
  };

  // Handle input to allow only numbers
  const handleNumberInput = (e, fieldName, maxLength) => {
    const value = e.target.value.replace(/\D/g, "");
    if (maxLength && value.length > maxLength) return;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Handle input to allow only letters and spaces
  const handleTextInput = (e, fieldName) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div ref={topDiv}>
      <Navbar />
      <div className="h-40 w-full"></div>

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
        <div className="w-[26rem] hidden sm:block">
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
            <input
              type="hidden"
              name="Created"
              value="x-sheetmonkey-current-date-time"
            />

            {/* Descriptive header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-custom-primary mb-4">
                Halal Fixed Income Fund Application Form
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
            {activeStep === 1 && (
              <div>
                <h3 className="text-xl text-center font-bold text-custom-primary">
                  Personal/Company's Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <CustomSelectInput
                    required
                    name="title"
                    options={["Mr", "Mrs", "Master", "Miss"]}
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
                    id="surname"
                    name="surname"
                    placeholder="Surname/Company Name:"
                    value={formData.surname}
                    onChange={(e) => handleTextInput(e, "surname")}
                  />
                  <CustomTextInput
                    required
                    id="other_names"
                    name="other_names"
                    placeholder="Other Names (for Individual Applicant only):"
                    value={formData.other_names}
                    onChange={(e) => handleTextInput(e, "other_names")}
                  />
                  <CustomTextInput
                    required
                    id="postal_address"
                    name="postal_address"
                    placeholder="Full Postal Address:"
                    value={formData.postal_address}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        postal_address: e.target.value,
                      }));
                    }}
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
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleTextInput(e, "city")}
                  />
                  <div>
                    <CustomTextInput
                      required
                      id="land_phone_number"
                      name="land_phone_number"
                      type="tel"
                      placeholder="Land Phone Number:"
                      value={formData.land_phone_number}
                      onChange={(e) =>
                        handleNumberInput(e, "land_phone_number", 11)
                      }
                    />
                    {!isLandPhoneValid() && formData.land_phone_number && (
                      <p className="text-xs sm:text-sm text-[coral]">
                        <span className="font-medium">Note:</span> Phone number
                        must be 11 digits.
                      </p>
                    )}
                  </div>
                  <div>
                    <CustomTextInput
                      required
                      id="mobile_phone_number"
                      name="mobile_phone_number"
                      type="tel"
                      placeholder="Mobile Phone Number:"
                      value={formData.mobile_phone_number}
                      onChange={(e) =>
                        handleNumberInput(e, "mobile_phone_number", 11)
                      }
                    />
                    {!isMobilePhoneValid() && formData.mobile_phone_number && (
                      <p className="text-xs sm:text-sm text-[coral]">
                        <span className="font-medium">Note:</span> Phone number
                        must be 11 digits.
                      </p>
                    )}
                  </div>
                  <CustomTextInput
                    required
                    type="email"
                    id="email_address"
                    name="email_address"
                    placeholder="Email Address"
                    value={formData.email_address}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        email_address: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    id="clearing_house_number"
                    name="clearing_house_number"
                    type="text"
                    placeholder="Clearing House Number (CHN):"
                    value={formData.clearing_house_number}
                    onChange={(e) =>
                      handleNumberInput(e, "clearing_house_number")
                    }
                  />
                  <CustomTextInput
                    id="name_of_stockbroker"
                    name="name_of_stockbroker"
                    type="text"
                    placeholder="Name of Your Stockbroker:"
                    value={formData.name_of_stockbroker}
                    onChange={(e) => handleTextInput(e, "name_of_stockbroker")}
                  />
                  <CustomTextInput
                    required
                    id="number_of_units"
                    name="number_of_units"
                    type="text"
                    placeholder="Number of Units Applied for:"
                    value={formData.number_of_units}
                    onChange={(e) => handleNumberInput(e, "number_of_units")}
                  />
                  <div>
                    {/* <input
                      required
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        e.target.type = "text";
                        if (!isValidDate(e.target.value)) {
                          setErrorMsg(
                            "Please enter a valid date of registration (not in the future)."
                          );
                        }
                      }}
                      name="date_of_registration"
                      placeholder="Date of Registration"
                      className="px-3 outline-none border h-[50px] w-full border-custom-primary bg-[#fff]"
                      value={formData.date_of_registration}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          date_of_registration: e.target.value,
                        }));
                      }}
                      max={new Date().toISOString().split("T")[0]}
                    /> */}
                    {mounted && (
                      <DatePicker
                        selected={formData.date_of_registration}
                        onChange={(date) => {
                          setErrorMsg("");
                          setFormData((prev) => ({
                            ...prev,
                            date_of_registration: date,
                          }));
                        }}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        placeholderText="Date of Registration"
                        className="px-3 outline-none border h-[50px] w-full border-custom-primary bg-[#fff]"
                        required
                      />
                    )}
                    {!isValidDate(formData.date_of_registration) &&
                      formData.date_of_registration && (
                        <p className="text-xs sm:text-sm text-[coral]">
                          <span className="font-medium">Note:</span> Please
                          enter a valid date of registration.
                        </p>
                      )}
                  </div>
                  <CustomTextInput
                    required
                    id="amount_paid"
                    name="amount_paid"
                    type="text"
                    placeholder="Value of Units Applied for/Amount Paid:"
                    value={formData.amount_paid}
                    // onChange={(e) => handleNumberInput(e, "amount_paid")}
                    onChange={handleAmountInputChange}
                    onBlur={handleAmountBlur}
                  />
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
            {activeStep === 2 && (
              <div>
                <h3 className="text-xl text-center font-bold text-custom-primary">
                  Joint Applicant's Info
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <CustomSelectInput
                    required
                    name="title_joint"
                    options={["Mr", "Mrs", "Master", "Miss"]}
                    value={formData.title_joint}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        title_joint: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="surname_joint"
                    name="surname_joint"
                    placeholder="Surname/Company Name:"
                    value={formData.surname_joint}
                    onChange={(e) => handleTextInput(e, "surname_joint")}
                  />
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
            {activeStep === 3 && (
              <div>
                <h3 className="text-xl text-center font-bold text-custom-primary">
                  Income Distribution
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <CustomSelectInput
                    required
                    name="payment_method"
                    options={["CASH", "REINVESTMENT"]}
                    value={formData.payment_method}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        payment_method: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="other_names_2"
                    name="other_names_2"
                    placeholder="Other Names:"
                    value={formData.other_names_2}
                    onChange={(e) => handleTextInput(e, "other_names_2")}
                  />
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
            {activeStep === 4 && (
              <div>
                <h3 className="text-xl text-center font-bold text-custom-primary">
                  Bank Details (for e-Dividend/Distribution)
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <CustomTextInput
                    required
                    id="bank_name"
                    name="bank_name"
                    placeholder="Bank Name:"
                    value={formData.bank_name}
                    onChange={(e) => handleTextInput(e, "bank_name")}
                  />
                  <CustomTextInput
                    required
                    id="branch_name"
                    name="branch_name"
                    placeholder="Branch Name:"
                    value={formData.branch_name}
                    onChange={(e) => handleTextInput(e, "branch_name")}
                  />
                  <div>
                    <CustomTextInput
                      required
                      id="bvn"
                      name="bvn"
                      type="text"
                      placeholder="Bank Verification Number"
                      value={formData.bvn}
                      onChange={(e) => handleNumberInput(e, "bvn", 11)}
                    />
                    {!isBvnValid() && formData.bvn && (
                      <p className="text-xs sm:text-sm text-[coral]">
                        <span className="font-medium">Note:</span> BVN must be
                        exactly 11 digits.
                      </p>
                    )}
                  </div>
                  <div>
                    <CustomTextInput
                      required
                      id="tin"
                      name="tin"
                      type="text"
                      placeholder="Tax Identification Number"
                      value={formData.tin}
                      onChange={(e) => handleNumberInput(e, "tin", 10)}
                    />
                    {!isTinValid() && formData.tin && (
                      <p className="text-xs sm:text-sm text-[coral]">
                        <span className="font-medium">Note:</span> TIN must be
                        exactly 10 digits.
                      </p>
                    )}
                  </div>
                  <div>
                    <CustomTextInput
                      required
                      id="account_number"
                      name="account_number"
                      type="text"
                      placeholder="Account Number"
                      value={formData.account_number}
                      onChange={(e) =>
                        handleNumberInput(e, "account_number", 10)
                      }
                    />
                    {!isAccountNumberValid() && formData.account_number && (
                      <p className="text-xs sm:text-sm text-[coral]">
                        <span className="font-medium">Note:</span> Account
                        Number must be exactly 10 digits.
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
                    className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium col-start-1 col-end-3"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {activeStep === 5 && (
              <div>
                <h3 className="text-xl text-center font-bold text-custom-primary">
                  Upload Signature or Thumbprint
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
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
                            "Signature file size must not exceed 2MB."
                          );
                          setSelectedSignature(null);
                        } else {
                          setErrorMsg("");
                          setSelectedSignature(file);
                        }
                      }}
                    />
                    <label htmlFor="signature">
                      <div
                        role="button"
                        className="bg-[#fff] flex justify-between items-center border border-custom-primary text-left w-full p-3"
                      >
                        Signature or Thumbprint Upload
                        {selectedSignature && (
                          <span className="ml-2 italic text-xs sm:text-sm">
                            {`(${selectedSignature.name.slice(0, 15)}${
                              selectedSignature.name.length > 15 ? "..." : ""
                            })`}
                          </span>
                        )}
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG (Max 2MB)
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium col-start-1 col-end-3 disabled:opacity-50"
                  >
                    {submissionStatus === "submitting"
                      ? "Submitting..."
                      : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
      <div className="py-10"></div>
      <Footer />
    </div>
  );
};

const CustomTextInput = ({
  placeholder,
  name,
  id,
  type = "text",
  required,
  value,
  onChange,
  maxLength,
}) => (
  <div className="w-full">
    <input
      required={required}
      className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      autoComplete="off"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  </div>
);

const CustomSelectInput = ({ options, name, value, onChange, required }) => (
  <div className="relative w-full mb-6">
    <select
      required={required}
      name={name}
      value={value}
      onChange={onChange}
      className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
    >
      <option value="">{name.replace(/_/g, " ")}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default HalalFixed;

// import React, { useRef, useState, useEffect } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import { MdKeyboardBackspace } from "react-icons/md";
// import Footer from "../../components/Footer/Footer";
// import { useRouter } from "next/router";

// const HalalFixed = () => {
//   const [uploadSignature, setUploadSignature] = useState(false);
//   const [selectedSignature, setSelectedSignature] = useState(null);
//   const [activeStep, setActiveStep] = useState(1);
//   const [formSteps, setFormSteps] = useState([
//     { name: "1. Personal/Company Info", active: true },
//     { name: "2. Joint Applicant", active: false },
//     { name: "3. Income Distribution", active: false },
//     { name: "4. Bank Details (for e-Dividend/Distribution)", active: false },
//     { name: "5. Upload Documents", active: false },
//   ]);
//   const [formData, setFormData] = useState({
//     title: "",
//     title_joint: "",
//     surname: "",
//     surname_joint: "",
//     other_names: "",
//     other_names_2: "",
//     amount_paid: "",
//     number_of_units: "",
//     payment_method: "",
//     date_of_registration: "",
//     postal_address: "",
//     city: "",
//     state: "",
//     land_phone_number: "",
//     mobile_phone_number: "",
//     email_address: "",
//     clearing_house_number: "",
//     name_of_stockbroker: "",
//     bank_name: "",
//     branch_name: "",
//     bvn: "",
//     tin: "",
//     account_number: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [submissionStatus, setSubmissionStatus] = useState(null);
//   const router = useRouter();
//   const topDiv = useRef();

//   useEffect(() => {
//     setFormSteps((prev) =>
//       prev.map((step, idx) => ({
//         ...step,
//         active: idx + 1 === activeStep,
//       }))
//     );
//   }, [activeStep]);

//   // Validation functions
//   const validMail = (email) =>
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
//       email
//     );

//   const isBvnValid = () => formData.bvn.length === 11;
//   const isTinValid = () => formData.tin.length === 10;
//   const isAccountNumberValid = () => formData.account_number.length === 10;

//   const isAnyValueEmpty = (values) =>
//     values.some((value) => value.trim() === "");

//   const validateForm = (sidebar = false) => {
//     let currentStep = activeStep;
//     setErrorMsg("");

//     if (currentStep === 1) {
//       const requiredFields = [
//         formData.title,
//         formData.surname,
//         formData.other_names,
//         formData.amount_paid,
//         formData.date_of_registration,
//         formData.postal_address,
//         formData.city,
//         formData.state,
//         formData.number_of_units,
//         formData.land_phone_number,
//         formData.mobile_phone_number,
//         formData.email_address,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg(
//           "All fields are required except Clearing House Number and Name of Stockbroker."
//         );
//         return false;
//       }
//       if (!validMail(formData.email_address)) {
//         setErrorMsg("Please enter a valid email address.");
//         return false;
//       }
//     } else if (currentStep === 2) {
//       const requiredFields = [formData.title_joint, formData.surname_joint];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("All fields are compulsory. Fill to continue!");
//         return false;
//       }
//     } else if (currentStep === 3) {
//       const requiredFields = [formData.payment_method, formData.other_names_2];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("All fields are compulsory. Fill to continue!");
//         return false;
//       }
//     } else if (currentStep === 4) {
//       const requiredFields = [
//         formData.bank_name,
//         formData.branch_name,
//         formData.bvn,
//         formData.tin,
//         formData.account_number,
//       ];
//       if (isAnyValueEmpty(requiredFields)) {
//         setErrorMsg("All fields are compulsory. Fill to continue!");
//         return false;
//       }
//       if (!isBvnValid()) {
//         setErrorMsg("BVN must be exactly 11 digits.");
//         return false;
//       }
//       if (!isTinValid()) {
//         setErrorMsg("TIN must be exactly 10 digits.");
//         return false;
//       }
//       if (!isAccountNumberValid()) {
//         setErrorMsg("Account Number must be exactly 10 digits.");
//         return false;
//       }
//     } else if (currentStep === 5) {
//       if (!selectedSignature) {
//         setErrorMsg("Please upload a signature or thumbprint.");
//         return false;
//       }
//     }

//     if (!sidebar) setActiveStep((prev) => prev + 1);
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted, preventing default behavior");

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
//     formDataToSubmit.append("created", new Date().toLocaleDateString("en-GB"));
//     formDataToSubmit.append("form_category", "Halal Fixed Income");

//     const sheetMonkeyUrl =
//       process.env.NEXT_PUBLIC_SHEET_MONKEY_HALAL_FIXED_INCOME_FUND_URL;

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
//         throw new Error("Submission failed with status: " + response.status);
//       }
//     } catch (error) {
//       setSubmissionStatus("error");
//       setErrorMsg("Failed to submit the form. Please try again later.");
//     }
//   };

//   return (
//     <div ref={topDiv}>
//       <Navbar />
//       <div className="h-40 w-full"></div>

//       <div
//         onClick={() => {
//           if (activeStep > 1) {
//             setErrorMsg("");
//             setActiveStep((prev) => prev - 1);
//           } else {
//             router.push("/open-account");
//           }
//         }}
//         className="ml-5 flex items-center gap-2 cursor-pointer sm:w-full max-w-[1200px] mx-auto"
//       >
//         <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
//           <MdKeyboardBackspace color="white" />
//         </div>
//         <p>Back</p>
//       </div>

//       <section className="mt-14 flex gap-10">
//         <div className="w-[26rem] hidden sm:block">
//           <ul className="flex flex-col px-10 bg-[#eaeaea]">
//             {formSteps.map((step, idx) => (
//               <li
//                 onClick={() => {
//                   if (idx < activeStep) {
//                     setActiveStep(idx + 1);
//                     setErrorMsg("");
//                   }
//                 }}
//                 key={idx}
//                 className="cursor-pointer py-6 text-lg leading-snug flex items-center gap-3 border-b border-[gainsboro]"
//               >
//                 {activeStep >= idx + 1 ? (
//                   <img src="/images/completedStep.png" alt="completed step" />
//                 ) : (
//                   <img
//                     src="/images/uncompletedStep.png"
//                     alt="uncompleted step"
//                   />
//                 )}
//                 <p
//                   className={`${
//                     activeStep >= idx + 1 && "text-custom-primary"
//                   } font-semibold`}
//                 >
//                   {step.name}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mr-5 ml-5 sm:ml-[unset] sm:mr-10 w-full">
//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
//           >
//             <input
//               type="hidden"
//               name="Created"
//               value="x-sheetmonkey-current-date-time"
//             />

//             {errorMsg && (
//               <p className="text-[coral] font-medium text-sm text-center mb-4">
//                 {errorMsg}
//               </p>
//             )}
//             {submissionStatus === "submitting" && (
//               <p className="text-center text-sm font-medium mb-4">
//                 Submitting your form, please wait...
//               </p>
//             )}
//             {submissionStatus === "success" && (
//               <p className="text-green-600 font-medium text-sm text-center mb-4">
//                 Form submitted successfully! Redirecting...
//               </p>
//             )}

//             {/* Header for the Form */}
//             {/* <h2 className="text-3xl text-center font-bold text-custom-primary">
//               Halal Fixed Income Fund Form
//             </h2> */}

//             {/* Step 1 */}
//             {activeStep === 1 && (
//               <div>
//                 <h3 className=" mt-4 text-2xl text-center font-bold text-custom-primary">
//                   Personal/Company's Information
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="title"
//                     options={["Mr", "Mrs", "Master", "Miss"]}
//                     value={formData.title}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         title: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="surname"
//                     name="surname"
//                     placeholder="Surname/Company Name:"
//                     value={formData.surname}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         surname: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="other_names"
//                     name="other_names"
//                     placeholder="Other Names (for Individual Applicant only):"
//                     value={formData.other_names}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         other_names: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="postal_address"
//                     name="postal_address"
//                     placeholder="Full Postal Address:"
//                     value={formData.postal_address}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         postal_address: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="state"
//                     name="state"
//                     placeholder="State"
//                     value={formData.state}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         state: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="city"
//                     name="city"
//                     placeholder="City"
//                     value={formData.city}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         city: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="land_phone_number"
//                     name="land_phone_number"
//                     type="tel"
//                     placeholder="Land Phone Number:"
//                     value={formData.land_phone_number}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         land_phone_number: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="mobile_phone_number"
//                     name="mobile_phone_number"
//                     type="tel"
//                     placeholder="Mobile Phone Number:"
//                     value={formData.mobile_phone_number}
//                     maxLength={14}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         mobile_phone_number: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     type="email"
//                     id="email_address"
//                     name="email_address"
//                     placeholder="Email Address"
//                     value={formData.email_address}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         email_address: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     id="clearing_house_number"
//                     name="clearing_house_number"
//                     type="number"
//                     placeholder="Clearing House Number (CHN):"
//                     value={formData.clearing_house_number}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         clearing_house_number: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     id="name_of_stockbroker"
//                     name="name_of_stockbroker"
//                     type="text"
//                     placeholder="Name of Your Stockbroker:"
//                     value={formData.name_of_stockbroker}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         name_of_stockbroker: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="number_of_units"
//                     name="number_of_units"
//                     type="number"
//                     placeholder="Number of Units Applied for:"
//                     value={formData.number_of_units}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         number_of_units: e.target.value,
//                       }));
//                     }}
//                   />
//                   <input
//                     required
//                     type="text"
//                     onFocus={(e) => (e.target.type = "date")}
//                     onBlur={(e) => (e.target.type = "text")}
//                     name="date_of_registration"
//                     placeholder="Date of Registration"
//                     className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                     value={formData.date_of_registration}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         date_of_registration: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="amount_paid"
//                     name="amount_paid"
//                     type="number"
//                     placeholder="Value of Units Applied for/Amount Paid:"
//                     value={formData.amount_paid}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         amount_paid: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       if (validateForm()) {
//                         topDiv.current.scrollIntoView();
//                       }
//                     }}
//                     type="button"
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {activeStep === 2 && (
//               <div>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Joint Applicant's Info
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="title_joint"
//                     options={["Mr", "Mrs", "Master", "Miss"]}
//                     value={formData.title_joint}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         title_joint: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="surname_joint"
//                     name="surname_joint"
//                     placeholder="Surname/Company Name:"
//                     value={formData.surname_joint}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         surname_joint: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       if (validateForm()) {
//                         topDiv.current.scrollIntoView();
//                       }
//                     }}
//                     type="button"
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 3 */}
//             {activeStep === 3 && (
//               <div>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Income Distribution
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="payment_method"
//                     options={["CASH", "REINVESTMENT"]}
//                     value={formData.payment_method}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         payment_method: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="other_names_2"
//                     name="other_names_2"
//                     placeholder="Other Names:"
//                     value={formData.other_names_2}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         other_names_2: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       if (validateForm()) {
//                         topDiv.current.scrollIntoView();
//                       }
//                     }}
//                     type="button"
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 4 */}
//             {activeStep === 4 && (
//               <div>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Bank Details (for e-Dividend/Distribution)
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomTextInput
//                     required
//                     id="bank_name"
//                     name="bank_name"
//                     placeholder="Bank Name:"
//                     value={formData.bank_name}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         bank_name: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="branch_name"
//                     name="branch_name"
//                     placeholder="Branch Name:"
//                     value={formData.branch_name}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         branch_name: e.target.value,
//                       }));
//                     }}
//                   />
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="bvn"
//                       name="bvn"
//                       type="text"
//                       placeholder="Bank Verification Number"
//                       value={formData.bvn}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           bvn: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isBvnValid() && formData.bvn && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> BVN must be
//                         exactly 11 digits.
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="tin"
//                       name="tin"
//                       type="text"
//                       placeholder="Tax Identification Number"
//                       value={formData.tin}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           tin: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isTinValid() && formData.tin && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> TIN must be
//                         exactly 10 digits.
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="account_number"
//                       name="account_number"
//                       type="text"
//                       placeholder="Account Number"
//                       value={formData.account_number}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           account_number: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isAccountNumberValid() && formData.account_number && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> Account
//                         Number must be exactly 10 digits.
//                       </p>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => {
//                       if (validateForm()) {
//                         topDiv.current.scrollIntoView();
//                       }
//                     }}
//                     type="button"
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium col-start-1 col-end-3"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 5 */}
//             {activeStep === 5 && (
//               <div>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Upload Signature or Thumbprint
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <div>
//                     <input
//                       hidden
//                       type="file"
//                       name="signature"
//                       accept="image/png, image/jpg, image/jpeg"
//                       id="signature"
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setSelectedSignature(e.target.files[0]);
//                       }}
//                     />
//                     <label htmlFor="signature">
//                       <div
//                         role="button"
//                         className="bg-[#fff] flex justify-between items-center border border-custom-primary text-left w-full p-3"
//                       >
//                         Signature or Thumbprint Upload
//                         {selectedSignature && (
//                           <span className="ml-2 italic text-xs sm:text-sm">
//                             {`(${selectedSignature.name.slice(0, 15)})`}
//                           </span>
//                         )}
//                       </div>
//                     </label>
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={submissionStatus === "submitting"}
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium col-start-1 col-end-3 disabled:opacity-50"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>
//       </section>
//       <div className="py-10"></div>
//       <Footer />
//     </div>
//   );
// };

// const CustomTextInput = ({
//   placeholder,
//   name,
//   id,
//   type = "text",
//   required,
//   value,
//   onChange,
//   maxLength,
// }) => (
//   <div className="w-full">
//     <input
//       required={required}
//       className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
//       name={name}
//       id={id}
//       placeholder={placeholder}
//       type={type}
//       autoComplete="off"
//       value={value}
//       onChange={onChange}
//       maxLength={maxLength}
//     />
//   </div>
// );

// const CustomSelectInput = ({ options, name, value, onChange, required }) => (
//   <div className="relative w-full mb-6">
//     <select
//       required={required}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
//     >
//       <option value="">{name.replace(/_/g, " ")}</option>
//       {options.map((option, index) => (
//         <option key={index} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default HalalFixed;
