import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/router";

const CorporateInvestor = () => {
  const [selectedSignature, setSelectedSignature] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedProof, setSelectedProof] = useState();
  const [activeStep, setActiveStep] = useState(1);
  const [formSteps, setFormSteps] = useState([
    { name: "Company's Information", active: true },
    { name: "Contact Personnel Info", active: false },
    { name: "Upload Document", active: false },
    { name: "Investment Information", active: false },
  ]);
  const [formData, setFormData] = useState({
    company_name: "",
    date_of_incorporation: "",
    biz_nature: "",
    company_email: "",
    rc: "",
    company_phone: "",
    company_address: "",
    postal_code: "",
    contact_person: "",
    designation: "",
    valid_id: "",
    id_no: "",
    issue_date: "",
    expiry_date: "",
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

  function isPhoneValid(phone) {
    const numericPhone = phone.replace(/\D/g, "");
    return numericPhone.length >= 10;
  }

  function isDigitsOnly(value) {
    return /^\d*$/.test(value);
  }

  function handleNumberInputChange(e, field) {
    const value = e.target.value;
    if (isDigitsOnly(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setErrorMsg("");
    }
  }

  function validateForm(sidebar = false) {
    let currentStep = activeStep;
    setErrorMsg("");

    if (currentStep === 1) {
      const requiredFields = [
        formData.company_name,
        formData.date_of_incorporation,
        formData.biz_nature,
        formData.company_email,
        formData.rc,
        formData.company_phone,
        formData.company_address,
        formData.postal_code,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue");
        return false;
      }
      if (!validMail(formData.company_email)) {
        setErrorMsg("Please enter a valid email address");
        return false;
      }
      if (!isPhoneValid(formData.company_phone)) {
        setErrorMsg("Note: Company phone number must be at least 10 digits");
        return false;
      }
      if (!isDigitsOnly(formData.company_phone)) {
        setErrorMsg("Note: Company phone number must contain only digits");
        return false;
      }
    } else if (currentStep === 2) {
      const requiredFields = [
        formData.contact_person,
        formData.designation,
        formData.valid_id,
        formData.id_no,
        formData.issue_date,
        formData.expiry_date,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue!");
        return false;
      }
    } else if (currentStep === 3) {
      // Removed upload validations - files are now optional
      // No validation needed for step 3
    } else if (currentStep === 4) {
      const requiredFields = [
        formData.time_frame,
        formData.specify,
        formData.amount,
      ];
      if (isAnyValueEmpty(requiredFields)) {
        setErrorMsg("Note: All fields are compulsory. Fill to continue!");
        return false;
      }
      if (!isDigitsOnly(formData.amount)) {
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

    for (let step = 1; step <= 4; step++) {
      setActiveStep(step);
      if (!validateForm(true)) {
        return;
      }
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      // formDataToSubmit.append(key, formData[key]);
      if (
        (key === "email" ||
          key === "kin_email" ||
          key === "email_address" ||
          key === "company_email") &&
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

    // Only append files if they exist
    if (selectedSignature) {
      formDataToSubmit.append("signature", selectedSignature);
    } else {
      formDataToSubmit.append("signature", "");
    }

    if (selectedId) {
      formDataToSubmit.append("means_of_identification_image", selectedId);
    } else {
      formDataToSubmit.append("means_of_identification_image", "");
    }

    if (selectedProof) {
      formDataToSubmit.append("proof_of_address_image", selectedProof);
    } else {
      formDataToSubmit.append("proof_of_address_image", "");
    }

    formDataToSubmit.append("created", new Date().toLocaleDateString("en-GB"));
    formDataToSubmit.append("form_category", "Corporate Investor");

    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }

    const sheetMonkeyUrl =
      process.env.NEXT_PUBLIC_SHEET_MONKEY_CORPORATE_INVESTOR_URL;

    if (!sheetMonkeyUrl) {
      setSubmissionStatus("error");
      setErrorMsg(
        "Sheet Monkey URL is not configured. Please contact support."
      );
      console.error("Error: Sheet Monkey URL is undefined");
      return;
    }

    try {
      setSubmissionStatus("submitting");
      console.log("Sending request to Sheet Monkey");
      const response = await fetch(sheetMonkeyUrl, {
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        setSubmissionStatus("success");
        console.log("Submission successful, redirecting...");
        window.location.href = "https://dnamaz-update.vercel.app/success";
      } else {
        const errorText = await response.text();
        throw new Error(
          `Submission failed with status: ${response.status}, Details: ${errorText}`
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMsg("Failed to submit the form. Please try again later.");
      console.error("Submission error:", error.message);
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
        <section className="mt-14 flex gap-10">
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
                <div
                  className={`${
                    activeStep !== 1 && "!hidden"
                  } w-full flex flex-col`}
                >
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Company's Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="company_name"
                      name="company_name"
                      placeholder="Company Name"
                      value={formData.company_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          company_name: e.target.value,
                        }));
                      }}
                    />
                    <input
                      required
                      type="text"
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                      name="date_of_incorporation"
                      id="date_of_incorporation"
                      placeholder="Date of Incorporation"
                      className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
                      value={formData.date_of_incorporation}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          date_of_incorporation: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="biz_nature"
                      name="biz_nature"
                      placeholder="Nature of Business"
                      value={formData.biz_nature}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          biz_nature: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      type="email"
                      id="company_email"
                      name="company_email"
                      placeholder="Company Email Address"
                      value={formData.company_email}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          company_email: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="rc"
                      name="rc"
                      placeholder="RC"
                      value={formData.rc}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          rc: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="company_phone"
                      name="company_phone"
                      placeholder="Company Phone Number"
                      type="text"
                      value={formData.company_phone}
                      maxLength={14}
                      onChange={(e) =>
                        handleNumberInputChange(e, "company_phone")
                      }
                    />
                    <CustomTextInput
                      required
                      id="company_address"
                      name="company_address"
                      placeholder="Company Address"
                      value={formData.company_address}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          company_address: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="postal_code"
                      name="postal_code"
                      placeholder="Postal Code"
                      value={formData.postal_code}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          postal_code: e.target.value,
                        }));
                      }}
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
              {true && (
                <div
                  className={`${
                    activeStep !== 2 && "!hidden"
                  } w-full flex flex-col`}
                >
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Contact Personnel Info
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="contact_person"
                      name="contact_person"
                      placeholder="Contact Person"
                      value={formData.contact_person}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          contact_person: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="designation"
                      name="designation"
                      placeholder="Designation"
                      value={formData.designation}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          designation: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="valid_id"
                      name="valid_id"
                      placeholder="Valid ID"
                      value={formData.valid_id}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          valid_id: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="id_no"
                      name="id_no"
                      placeholder="ID Number"
                      value={formData.id_no}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          id_no: e.target.value,
                        }));
                      }}
                    />
                    <input
                      required
                      type="text"
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                      name="issue_date"
                      id="issue_date"
                      placeholder="Issue Date"
                      className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
                      value={formData.issue_date}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          issue_date: e.target.value,
                        }));
                      }}
                    />
                    <input
                      required
                      type="text"
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="Expiry Date"
                      className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
                      value={formData.expiry_date}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          expiry_date: e.target.value,
                        }));
                      }}
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
              {true && (
                <div
                  className={`${
                    activeStep !== 3 && "!hidden"
                  } w-full flex flex-col`}
                >
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Document Upload (Optional)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <CustomSelectInput
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
                          className="hidden"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          hidden
                          id="means_of_id"
                          name="means_of_identification_image"
                          onChange={(e) => setSelectedId(e.target.files[0])}
                        />
                        <label
                          ref={idRef}
                          className="hidden"
                          htmlFor="means_of_id"
                        >
                          Means of Identification Image
                        </label>
                      </div>
                    </div>
                    <div>
                      <CustomSelectInput
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
                          className="hidden"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          hidden
                          id="proof_of_address"
                          name="proof_of_address_image"
                          onChange={(e) => setSelectedProof(e.target.files[0])}
                        />
                        <label
                          ref={proofRef}
                          className="hidden"
                          htmlFor="proof_of_address"
                        >
                          Proof of Address
                        </label>
                      </div>
                    </div>
                    <div>
                      <input
                        hidden
                        type="file"
                        name="signature"
                        accept="image/png, image/jpg, image/jpeg"
                        id="signature"
                        onChange={(e) =>
                          setSelectedSignature(e.target.files[0])
                        }
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
              {/* Step 4 */}
              {true && (
                <div
                  className={`${
                    activeStep !== 4 && "!hidden"
                  } w-full flex flex-col`}
                >
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Investment Info
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomSelectInput
                      required
                      name="time_frame"
                      id="time_frame"
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
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          specify: e.target.value,
                        }));
                      }}
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
  value,
  onChange,
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

export default CorporateInvestor;

// import React, { useRef, useState } from "react";
// import { MdKeyboardBackspace } from "react-icons/md";
// import Footer from "../../components/Footer/Footer";
// import Navbar from "../../components/Navbar/Navbar";
// import { useRouter } from "next/router";

// const CorporateInvestor = () => {
//   const [uploadSignature, setUploadSignature] = useState(false);
//   const [uploadPassport, setUploadPassport] = useState(false);
//   const [selectedPassport, setSelectedPassport] = useState();
//   const [selectedSignature, setSelectedSignature] = useState();
//   const [selectedId, setSelectedId] = useState();
//   const [selectedProof, setSelectedProof] = useState();
//   const [activeStep, setActiveStep] = useState(1);
//   const [formSteps, setFormSteps] = useState([
//     {
//       name: "company's Information",
//       active: true,
//     },
//     {
//       name: "Contact Personnel Info",
//       active: false,
//     },
//     {
//       name: "Upload Document",
//       active: false,
//     },
//     {
//       name: "Investment Information",
//       active: false,
//     },
//   ]);
//   const [formData, setFormData] = useState({
//     coyName: "",
//     doi: "",
//     bizNature: "",
//     coyEmail: "",
//     rc: "",
//     coyPhone: "",
//     coyAddress: "",
//     postalCode: "",
//     contactPerson: "",
//     designation: "",
//     validId: "",
//     idNo: "",
//     issueDate: "",
//     expiryDate: "",
//     timeFrame: "",
//     specify: "",
//     amount: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();

//   const signatureRef = useRef(null);
//   const passportRef = useRef(null);
//   const idRef = useRef(null);
//   const proofRef = useRef(null);
//   const topDiv = useRef();

//   const {
//     coyName,
//     doi,
//     bizNature,
//     coyEmail,
//     rc,
//     coyPhone,
//     coyAddress,
//     postalCode,
//     contactPerson,
//     designation,
//     validId,
//     idNo,
//     issueDate,
//     expiryDate,
//     timeFrame,
//     specify,
//     amount,
//   } = formData;

//   function isAnyValueEmpty(array) {
//     const result = [];
//     array.map((arr) => {
//       result.push(arr.trim() === "");
//     });
//     return result.indexOf(true) < 0 ? false : true;
//   }

//   function validateForm(sidebar) {
//     let currentStep = activeStep;
//     if (currentStep === 1) {
//       const res = isAnyValueEmpty([
//         coyName,
//         doi,
//         bizNature,
//         coyEmail,
//         rc,
//         coyPhone,
//         coyAddress,
//         postalCode,
//       ]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue");
//         return;
//       }
//       if (validMail(coyEmail) === false) {
//         setErrorMsg("Please enter a valid email address");
//         return;
//       }
//     } else if (currentStep === 2) {
//       const res = isAnyValueEmpty([
//         contactPerson,
//         designation,
//         validId,
//         idNo,
//         issueDate,
//         expiryDate,
//       ]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }
//     } else if (currentStep === 3) {
//       const res = isAnyValueEmpty([address, street, city, state, country]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }
//     }
//     !sidebar && setActiveStep((prev) => prev + 1);
//   }

//   function validMail(mail) {
//     return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
//       mail
//     );
//   }

//   return (
//     <div className="" ref={topDiv}>
//       <Navbar />
//       <div className="h-40 w-full"></div>
//       <div>
//         <div
//           onClick={() => {
//             if (activeStep > 1) {
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
//           <div className="w-96 hidden sm:block ">
//             <ul className="flex flex-col px-10 bg-[#eaeaea]">
//               {formSteps.map((step, idx) => (
//                 <li
//                   onClick={() => {
//                     if (idx < activeStep) {
//                       setActiveStep(idx + 1);
//                     }
//                     setErrorMsg("");
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
//                     } font-semibold `}
//                   >
//                     {step.name}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mr-5 ml-5 sm:ml-[unset] sm:mr-10 w-full">
//             <form
//               action="https://api.sheetmonkey.io/form/d9L7BaXFZnm7Hiu25HhnmG"
//               method="POST"
//               encType="multipart/form-data"
//               className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
//             >
//               <input
//                 type="text"
//                 name="Account Type"
//                 value="Corporate Investor"
//                 id="corporateInvestor"
//                 hidden
//               />
//               <input
//                 type="hidden"
//                 name="x-sheetmonkey-redirect"
//                 value="https://dnamaz-update.vercel.app/success"
//               />
//               {/* Step 1 */}
//               {true && (
//                 <div
//                   className={`${
//                     activeStep !== 1 && "!hidden"
//                   } w-full flex flex-col`}
//                 >
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Company&#39;s Information
//                   </h3>
//                   {activeStep === 1 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="companayName"
//                       name="Company Name"
//                       placeholder="Company Name"
//                       value={coyName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           coyName: e.target.value,
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
//                       // type="date"
//                       name="Date of Incorporation"
//                       placeholder="Date of Incorporation"
//                       className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                       value={doi}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           doi: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="natureOfBusiness"
//                       name="Nature of Business"
//                       placeholder="Nature of Business"
//                       value={bizNature}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           bizNature: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       type="email"
//                       id="email"
//                       name="Company's Email"
//                       placeholder="Comany's Email Address"
//                       value={coyEmail}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           coyEmail: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="rc"
//                       name="RC"
//                       placeholder="RC"
//                       value={rc}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           rc: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="phone"
//                       name="Company's Phone"
//                       placeholder="Company's Phone Number"
//                       type="number"
//                       value={coyPhone}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           coyPhone: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="companyAddress"
//                       name="Company's Address"
//                       placeholder="Company's Address"
//                       value={coyAddress}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           coyAddress: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="postalCpde"
//                       name="Postal Code"
//                       placeholder="Postal Code"
//                       value={postalCode}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           postalCode: e.target.value,
//                         }));
//                       }}
//                     />
//                     <button
//                       onClick={() => {
//                         // setActiveStep(2);
//                         validateForm();
//                         topDiv.current.scrollIntoView();
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
//                 <div
//                   className={`${
//                     activeStep !== 2 && "!hidden"
//                   } w-full flex flex-col`}
//                 >
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Contact Personnel Info
//                   </h3>
//                   {activeStep === 2 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}

//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="contactPerson"
//                       name="Contact Person"
//                       placeholder="Contact Person"
//                       value={contactPerson}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           contactPerson: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="designation"
//                       name="Designation"
//                       placeholder="Designation"
//                       value={designation}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           designation: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="validId"
//                       name="Valid ID"
//                       placeholder="Valid ID"
//                       value={validId}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           validId: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="idNo"
//                       name="Id No"
//                       placeholder="Id No"
//                       value={idNo}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           idNo: e.target.value,
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
//                       // type="date"
//                       name="Issue Date"
//                       placeholder="Issue Date"
//                       className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                       value={issueDate}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           issueDate: e.target.value,
//                         }));
//                       }}
//                     />{" "}
//                     <input
//                       required
//                       type="text"
//                       onFocus={(e) => {
//                         e.target.type = "date";
//                       }}
//                       onBlur={(e) => {
//                         e.target.type = "text";
//                       }}
//                       // type="date"
//                       name="Expiry Date"
//                       placeholder="Expiry Date"
//                       className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                       value={expiryDate}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           expiryDate: e.target.value,
//                         }));
//                       }}
//                     />
//                     <button
//                       onClick={() => {
//                         validateForm();
//                         topDiv.current.scrollIntoView();
//                         // setActiveStep(3);
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
//                 <div
//                   className={`${
//                     activeStep !== 3 && "!hidden"
//                   } w-full flex flex-col`}
//                 >
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
//                         name="Means of Identification"
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
//                           hidden
//                           id="means_of_id"
//                           name="Means of Identification (Image)"
//                           onChange={(e) => setSelectedId(e.target.files[0])}
//                         />
//                         <label
//                           ref={idRef}
//                           className="hidden"
//                           htmlFor="means_of_id"
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
//                         name="Proof of Address"
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
//                           type="file"
//                           accept="image/png, image/jpg, image/jpeg"
//                           hidden
//                           id="proof_of_address"
//                           name="Proof of Address (Image)"
//                           onChange={(e) => setSelectedProof(e.target.files[0])}
//                         />
//                         <label
//                           ref={proofRef}
//                           className="hidden"
//                           htmlFor="proof_of_address"
//                         >
//                           Proof of Address
//                         </label>
//                       </div>
//                     </div>
//                     <div>
//                       <input
//                         hidden
//                         type="file"
//                         name="Signature"
//                         accept="image/png, image/jpg, image/jpeg"
//                         id="signature"
//                         onChange={(e) =>
//                           setSelectedSignature(e.target.files[0])
//                         }
//                       />
//                       <label htmlFor="signature">
//                         <div
//                           role="button"
//                           // onClick={() => setUploadSignature(true)}
//                           className="bg-[#fff] flex justify-between  items-center border border-custom-primary text-left w-full p-3"
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
//                         topDiv.current.scrollIntoView();
//                         setActiveStep(4);
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
//                 <div
//                   className={`${
//                     activeStep !== 4 && "!hidden"
//                   } w-full flex flex-col`}
//                 >
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Investment Info
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomSelectInput
//                       required
//                       name="Time Frame"
//                       options={[
//                         "Time Frame",
//                         "Short Term (Less than or equal to 1 year)",
//                         "Mid-Term (More than 1 year - less than 5yrs)",
//                         "Long Term (More than 5 less - than 10yrs)",
//                       ]}
//                       value={timeFrame}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           timeFrame: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="specify"
//                       name="Specify"
//                       placeholder="Specify"
//                       value={specify}
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
//                       name="Amount (₦) "
//                       placeholder="Amount (₦) "
//                       value={amount}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           amount: e.target.value,
//                         }));
//                       }}
//                     />
//                     <div></div>
//                     <button
//                       onClick={validateForm}
//                       type="submit"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
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
// }) => {
//   return (
//     <div className="w-full">
//       <input
//         required={required ? true : false}
//         className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
//         name={name}
//         id={id}
//         type={type}
//         placeholder={placeholder}
//         autoComplete="new-password"
//         value={value}
//         onChange={onChange}
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
//   value,
//   onChange,
// }) => {
//   return (
//     <div className="relative">
//       <select
//         required={required ? true : false}
//         name={name}
//         value={value}
//         onChange={(e) => {
//           if (name == "Proof of Address") {
//             setSelectedProof(e.target.value);
//             proofRef.current.click();
//           } else if (name == "Means of Identification") {
//             setSelectedId(e.target.value);
//             idRef.current.click();
//           } else {
//             onChange(e);
//           }
//         }}
//         defaultValue="some random test value"
//         className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
//       >
//         {options.map((item, idx) => (
//           <option key={idx} value={item} className="capitalize">
//             {" "}
//             {item}{" "}
//           </option>
//         ))}
//       </select>
//       <p className="italic text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-5 sm:right-10">
//         {name == "Proof of Address" && selectedProof != undefined
//           ? `${selectedProof?.name?.slice(0, 15)}`
//           : name == "Means of Identification" && selectedId != undefined
//           ? `${selectedId?.name?.slice(0, 15)}`
//           : null}
//       </p>
//     </div>
//   );
// };

// export default CorporateInvestor;
