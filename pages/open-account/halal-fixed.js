import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";

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
    date_of_registration: "",
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

  const isBvnValid = () => formData.bvn.length === 11;
  const isTinValid = () => formData.tin.length === 10;
  const isAccountNumberValid = () => formData.account_number.length === 10;

  const isAnyValueEmpty = (values) =>
    values.some((value) => value.trim() === "");

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
      if (!selectedSignature) {
        setErrorMsg("Please upload a signature or thumbprint.");
        return false;
      }
    }

    if (!sidebar) setActiveStep((prev) => prev + 1);
    return true;
  };

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
      formDataToSubmit.append(key, formData[key]);
    });
    if (selectedSignature) {
      formDataToSubmit.append("signature", selectedSignature);
    }

    // const sheetMonkeyUrl =
    //   "https://api.sheetmonkey.io/form/tcvs9FpvViNXFx5BkcEqSJ";
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
        window.location.href = "https://dnamaz-update.vercel.app/success";
      } else {
        throw new Error("Submission failed with status: " + response.status);
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMsg("Failed to submit the form. Please try again later.");
    }
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

      <section className="mt-14 flex gap-10">
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
                <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        surname: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="other_names"
                    name="other_names"
                    placeholder="Other Names (for Individual Applicant only):"
                    value={formData.other_names}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        other_names: e.target.value,
                      }));
                    }}
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
                  <CustomTextInput
                    required
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="land_phone_number"
                    name="land_phone_number"
                    type="tel"
                    placeholder="Land Phone Number:"
                    value={formData.land_phone_number}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        land_phone_number: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="mobile_phone_number"
                    name="mobile_phone_number"
                    type="tel"
                    placeholder="Mobile Phone Number:"
                    value={formData.mobile_phone_number}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        mobile_phone_number: e.target.value,
                      }));
                    }}
                  />
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
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        clearing_house_number: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    id="name_of_stockbroker"
                    name="name_of_stockbroker"
                    placeholder="Name of Your Stockbroker:"
                    value={formData.name_of_stockbroker}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        name_of_stockbroker: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="number_of_units"
                    name="number_of_units"
                    type="number"
                    placeholder="Number of Units Applied for:"
                    value={formData.number_of_units}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        number_of_units: e.target.value,
                      }));
                    }}
                  />
                  <input
                    required
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="date_of_registration"
                    placeholder="Date of Registration"
                    className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
                    value={formData.date_of_registration}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        date_of_registration: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="amount_paid"
                    name="amount_paid"
                    type="number"
                    placeholder="Value of Units Applied for/Amount Paid:"
                    value={formData.amount_paid}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        amount_paid: e.target.value,
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
            {activeStep === 2 && (
              <div>
                <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        surname_joint: e.target.value,
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
            {activeStep === 3 && (
              <div>
                <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        other_names_2: e.target.value,
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

            {/* Step 4 */}
            {activeStep === 4 && (
              <div>
                <h3 className="text-3xl text-center font-bold text-custom-primary">
                  Bank Details (for e-Dividend/Distribution)
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <CustomTextInput
                    required
                    id="bank_name"
                    name="bank_name"
                    placeholder="Bank Name:"
                    value={formData.bank_name}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        bank_name: e.target.value,
                      }));
                    }}
                  />
                  <CustomTextInput
                    required
                    id="branch_name"
                    name="branch_name"
                    placeholder="Branch Name:"
                    value={formData.branch_name}
                    onChange={(e) => {
                      setErrorMsg("");
                      setFormData((prev) => ({
                        ...prev,
                        branch_name: e.target.value,
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
                      value={formData.bvn}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          bvn: e.target.value,
                        }));
                      }}
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
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          tin: e.target.value,
                        }));
                      }}
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
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          account_number: e.target.value,
                        }));
                      }}
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
                <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                        setErrorMsg("");
                        setSelectedSignature(e.target.files[0]);
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
                            {`(${selectedSignature.name.slice(0, 15)})`}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium col-start-1 col-end-3 disabled:opacity-50"
                  >
                    Submit
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

//   // Temporarily disable validation
//   const validateForm = (sidebar = false) => {
//     setErrorMsg("");
//     if (!sidebar) setActiveStep((prev) => prev + 1);
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted, preventing default behavior");

//     const formDataToSubmit = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSubmit.append(key, formData[key]);
//     });
//     if (selectedSignature) {
//       formDataToSubmit.append("signature", selectedSignature);
//     }

//     const sheetMonkeyUrl = "https://api.sheetmonkey.io/form/nMCEnHqm3JfiJ7Xi8PTz8p"; // Hardcoded for now
//     console.log("Sheet Monkey URL:", sheetMonkeyUrl);

//     try {
//       setSubmissionStatus("submitting");
//       console.log("Sending request to Sheet Monkey");
//       const response = await fetch(sheetMonkeyUrl, {
//         method: "POST",
//         headers: {
//           Accept: "application/json", // Request JSON response
//         },
//         body: formDataToSubmit,
//       });

//       // Log the response status and headers
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", Object.fromEntries(response.headers));

//       // Check if the response is JSON
//       const contentType = response.headers.get("Content-Type") || "";
//       if (contentType.includes("application/json")) {
//         const responseData = await response.json();
//         console.log("Form Response (JSON):", responseData);
//       } else {
//         // If not JSON, parse as text to inspect the response
//         const responseText = await response.text();
//         console.log("Form Response (Text):", responseText);
//       }

//       if (response.ok) {
//         setSubmissionStatus("success");
//         console.log("Submission successful, redirecting...");
//         window.location.href = "https://dnamaz-update.vercel.app/success";
//       } else {
//         throw new Error("Submission failed with status: " + response.status);
//       }
//     } catch (error) {
//       setSubmissionStatus("error");
//       setErrorMsg("Failed to submit the form. Please try again later.");
//       console.error("Submission error:", error.message);
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

//             {/* Step 1 */}
//             {activeStep === 1 && (
//               <div>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Personal/Company's Information
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
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
//                     id="mobile_phone_number"
//                     name="mobile_phone_number"
//                     type="tel"
//                     placeholder="Mobile Phone Number:"
//                     value={formData.mobile_phone_number}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         mobile_phone_number: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
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
//                     type="text"
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
//                   </div>
//                   <div>
//                     <CustomTextInput
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
//                   </div>
//                   <div>
//                     <CustomTextInput
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
//   value,
//   onChange,
// }) => (
//   <div className="w-full">
//     <input
//       className="outline-none bg-white placeholder:font-medium border border-custom-primary p-3 w-full"
//       name={name}
//       id={id}
//       placeholder={placeholder}
//       type={type}
//       autoComplete="off"
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// const CustomSelectInput = ({ options, name, value, onChange }) => (
//   <div className="relative w-full mb-6">
//     <select
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

// import React, { useRef, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import { MdKeyboardBackspace } from "react-icons/md";
// import Footer from "../../components/Footer/Footer";
// import { useRouter } from "next/router";

// const halalFixed = () => {
//   const [uploadSignature, setUploadSignature] = useState(false);
//   const [selectedSignature, setSelectedSignature] = useState();
//   const [activeStep, setActiveStep] = useState(1);
//   const [selectedVerify, setSelectedVerify] = useState();

//   const [formSteps, setFormSteps] = useState([
//     {
//       name: "1. Personal/Company Info",
//       active: true,
//       // completed:false,
//     },
//     {
//       name: "2. Joint Applicant",
//       active: false,
//     },
//     {
//       name: "3. INCOME DISTRIBUTION",
//       active: false,
//     },
//     {
//       name: "4. BANK DETAILS (FOR e-DIVIDEND/DISTRIBUTION)",
//       active: false,
//     },
//     {
//       name: "5. Upload Documents",
//       active: false,
//     },
//   ]);
//   const [formData, setFormData] = useState({
//     title: "",
//     titleJoint: "",
//     surname: "",
//     surnameJoint: "",
//     otherNames: "",
//     otherNames2: "",
//     amountPaid: "",
//     numOFUnits: "",
//     tick: "",
//     date: "",
//     postalAdress: "",
//     city: "",
//     State: "",
//     landPhoneNumber: "",
//     mobilePhoneNumber: "",
//     email: "",
//     kinName: "",
//     clearingHouseNumber: "",
//     stockBrockerName: "",
//     bankName: "",
//     branchName: "",
//     bvn: "",
//     tin: "",
//     accountNumber: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();

//   // console.log("employment status ==>", formData.employmentStatus);

//   const verifyRef = useRef(null);
//   const proofRef = useRef(null);
//   const topDiv = useRef();
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
//         title,

//         // titleJoint,
//         surname,
//         // surnameJoint,

//         otherNames,

//         amountPaid,
//         date,
//         postalAdress,
//         city,
//         State,
//         numOFUnits,
//         landPhoneNumber,
//         mobilePhoneNumber,
//         email,
//         // kinName,
//         clearingHouseNumber,
//         stockBrockerName,
//       ]);
//       if (res) {
//         setErrorMsg("All fields are required");
//         return;
//       }
//       //   if (res) {
//       //     setErrorMsg("Note: All fields except 'Title, Employement status' are compulsory");
//       //     return;
//       //   }

//       if (validMail(email) == false) {
//         setErrorMsg("Please enter a valid email address");
//         return;
//       }
//     } else if (currentStep == 2) {
//       const res = isAnyValueEmpty([titleJoint, surnameJoint]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }
//     } else if (currentStep == 3) {
//       const res = isAnyValueEmpty([tick, otherNames2]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }
//     } else if (currentStep == 4) {
//       const res = isAnyValueEmpty([
//         bvn,
//         tin,
//         accountNumber,
//         bankName,
//         branchName,
//       ]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }

//       if (isBvnValid() == false) {
//         setErrorMsg("Note: Bvn must be exactly 11 numbers");
//         return;
//       }
//       if (isTinValid() == false) {
//         setErrorMsg("Note: Bvn must be exactly 11 numbers");
//         return;
//       }
//       if (isaccountNumberValid() == false) {
//         setErrorMsg("Note: Bvn must be exactly 11 numbers");
//         return;
//       }
//     }
//     !sidebar && setActiveStep((prev) => prev + 1);
//     // console.log(title);

//     // if (currentStep === 2) {
//     //   const res = isAnyValueEmpty([
//     //     formData.employmentStatus,
//   }
//   const {
//     title,
//     titleJoint,
//     surname,
//     surnameJoint,
//     otherNames,
//     otherNames2,
//     amountPaid,
//     numOFUnits,
//     tick,
//     date,
//     postalAdress,
//     city,
//     State,
//     landPhoneNumber,
//     mobilePhoneNumber,
//     email,
//     kinName,
//     clearingHouseNumber,
//     stockBrockerName,
//     bankName,
//     branchName,
//     bvn,
//     tin,
//     accountNumber,
//   } = formData;
//   function isBvnValid() {
//     return bvn.length === 11 ? true : false;
//   }
//   function isTinValid() {
//     return tin.length === 10 ? true : false;
//   }
//   function isaccountNumberValid() {
//     return accountNumber.length === 10 ? true : false;
//   }

//   function validMail(mail) {
//     return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
//       mail
//     );
//   }

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
//         <div className="w-[26rem] hidden sm:block ">
//           <ul className="flex flex-col px-10 bg-[#eaeaea]">
//             {formSteps.map((step, idx) => (
//               <li
//                 onClick={() => {
//                   if (idx < activeStep) {
//                     setActiveStep(idx + 1);
//                   }
//                   setErrorMsg("");
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
//                   } font-semibold `}
//                 >
//                   {step.name}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="mr-5 ml-5 sm:ml-[unset] sm:mr-10 w-full">
//           <form
//             autoComplete="new-password"
//             action="https://api.sheetmonkey.io/form/d9L7BaXFZnm7Hiu25HhnmG"
//             method="POST"
//             encType="multipart/form-data"
//             className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
//           >
//             <input
//               type="hidden"
//               name="x-sheetmonkey-redirect"
//               value="https://dnamaz-update.vercel.app/success"
//             />

//             {/* Step 1 */}
//             {true && (
//               <div className={`${activeStep === 1 && "!block"} hidden`}>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Personal/Company's Information
//                 </h3>
//                 {activeStep === 1 && errorMsg && (
//                   <p className="text-[coral] font-medium text-sm text-center">
//                     {errorMsg}
//                   </p>
//                 )}
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="Title"
//                     options={["Mr", "Mrs", "Master", "Miss"]}
//                     value={title}
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
//                     //   type="number"
//                     placeholder="Surname /Company Name:"
//                     value={surname}
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
//                     id="othernames"
//                     name="othernames"
//                     //   type="number"
//                     placeholder="Other Names (for Individual Applicant only):"
//                     value={otherNames}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         otherNames: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="postalAddress"
//                     name="Postal Address"
//                     //   type="number"
//                     placeholder="Full Postal Address:"
//                     value={postalAdress}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         postalAdress: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="State"
//                     name="State"
//                     //   type="number"
//                     placeholder="State"
//                     value={State}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         State: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="city"
//                     name="city"
//                     //   type="number"
//                     placeholder="City"
//                     value={city}
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
//                     id="landPhoneNumber"
//                     name="land Phone Number"
//                     type="number"
//                     placeholder="Land Phone Number:"
//                     value={landPhoneNumber}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         landPhoneNumber: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="mobilePhoneNumber"
//                     name="Mobile Phone Number"
//                     type="number"
//                     placeholder="Mobile Phone Number:"
//                     value={mobilePhoneNumber}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         mobilePhoneNumber: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     type="email"
//                     id="email"
//                     name="Email"
//                     placeholder="Email Address"
//                     value={email}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         email: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     id="clearingHouseNumber"
//                     name="clearing House Number"
//                     type="number"
//                     placeholder="Clearing House Number (CHN):"
//                     value={clearingHouseNumber}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         clearingHouseNumber: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     id="stockBrocker"
//                     name="stock Broker"
//                     //   type="number"
//                     placeholder="Name of Your Stockbroker:"
//                     value={stockBrockerName}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         stockBrockerName: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="numberOfUnits"
//                     name="numberOfUnits"
//                     type="number"
//                     placeholder="Number of Units Applied for:"
//                     value={numOFUnits}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         numOFUnits: e.target.value,
//                       }));
//                     }}
//                   />
//                   <input
//                     required
//                     type="text"
//                     onFocus={(e) => {
//                       e.target.type = "date";
//                     }}
//                     onBlur={(e) => {
//                       e.target.type = "text";
//                     }}
//                     // type="date"
//                     name="Date"
//                     placeholder="Date of registration"
//                     className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                     value={date}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         date: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="amountPaid"
//                     name="amount Paid"
//                     type="number"
//                     placeholder="Value of Units Applied for/Amount Paid:"
//                     value={amountPaid}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         amountPaid: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       validateForm();
//                       topDiv.current.scrollIntoView();
//                     }}
//                     type="button"
//                     className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                   >
//                     Next
//                   </button>

//                   {/* <CustomSelectInput
//                       required
//                       name="Title"
//                       options={["Title", "Mr", "Mrs", "Master", "Miss"]}
//                       value={title}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           title: e.target.value,
//                         }));
//                       }}
//                     /> */}
//                 </div>
//               </div>
//             )}
//             {/* Step 2 */}
//             {true && (
//               <div className={`${activeStep === 2 && "!block"} hidden`}>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   JOINT APPLICANT's info
//                 </h3>
//                 {activeStep === 2 && errorMsg && (
//                   <p className="text-[coral] font-medium text-sm text-center">
//                     {errorMsg}
//                   </p>
//                 )}
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="Title"
//                     options={["Mr", "Mrs", "Master", "Miss"]}
//                     value={titleJoint}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         titleJoint: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="surnameJoint"
//                     name="surname Joint"
//                     //   type="number"
//                     placeholder="Surname /Company Name:"
//                     value={surnameJoint}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         surnameJoint: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       validateForm();
//                       topDiv.current.scrollIntoView();
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
//             {true && (
//               <div className={`${activeStep === 3 && "!block"} hidden`}>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   INCOME DISTRIBUTION
//                 </h3>
//                 {activeStep === 3 && errorMsg && (
//                   <p className="text-[coral] font-medium text-sm text-center">
//                     {errorMsg}
//                   </p>
//                 )}
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomSelectInput
//                     required
//                     name="Payment Method"
//                     options={[
//                       "CASH",
//                       // "female",
//                       "REINVESTMENT",
//                     ]}
//                     value={tick}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         tick: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="othernames"
//                     name="othernames"
//                     //   type="number"
//                     placeholder="Other Names:"
//                     value={otherNames2}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         otherNames2: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       validateForm();
//                       topDiv.current.scrollIntoView();
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
//             {true && (
//               <div className={`${activeStep === 4 && "!block"} hidden`}>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   BANK DETAILS (FOR e-DIVIDEND/DISTRIBUTION)
//                 </h3>
//                 {activeStep === 4 && errorMsg && (
//                   <p className="text-[coral] font-medium text-sm text-center">
//                     {errorMsg}
//                   </p>
//                 )}

//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <CustomTextInput
//                     required
//                     id="bankname"
//                     name="Bank name"
//                     //   type="number"
//                     placeholder="Bank Name:"
//                     value={bankName}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         bankName: e.target.value,
//                       }));
//                     }}
//                   />
//                   <CustomTextInput
//                     required
//                     id="branchname"
//                     name="Branch name"
//                     //   type="number"
//                     placeholder="Branch Name:"
//                     value={branchName}
//                     onChange={(e) => {
//                       setErrorMsg("");
//                       setFormData((prev) => ({
//                         ...prev,
//                         branchName: e.target.value,
//                       }));
//                     }}
//                   />
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="bvn"
//                       name="BVN"
//                       type="number"
//                       placeholder="Bank Verfication Number"
//                       value={bvn}
//                       onChange={(e) => {
//                         // console.log(e);
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           bvn: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isBvnValid() && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> BVN can&#39;t
//                         be less or more than 11 numbers
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="tin"
//                       name="TIN"
//                       type="number"
//                       placeholder="Tax Identification Number"
//                       value={tin}
//                       onChange={(e) => {
//                         // console.log(e);
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           tin: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isTinValid() && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> TIN can&#39;t
//                         be less or more than 10 numbers
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <CustomTextInput
//                       required
//                       id="accountNumber"
//                       name="Account Number"
//                       type="number"
//                       placeholder="account Number"
//                       value={accountNumber}
//                       onChange={(e) => {
//                         // console.log(e);
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           accountNumber: e.target.value,
//                         }));
//                       }}
//                     />
//                     {!isaccountNumberValid() && (
//                       <p className="text-xs sm:text-sm text-[coral]">
//                         <span className="font-medium">Note:</span> Account
//                         Number can&#39;t be less or more than 10 numbers
//                       </p>
//                     )}
//                   </div>
//                   <button
//                     // className=" col-start-1 col-end-3"
//                     onClick={() => {
//                       validateForm();
//                       topDiv.current.scrollIntoView();
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
//             {true && (
//               <div className={`${activeStep === 5 && "!block"} hidden`}>
//                 <h3 className="text-3xl text-center font-bold text-custom-primary">
//                   Upload Signature or Thumbprint
//                 </h3>
//                 {activeStep === 5 && errorMsg && (
//                   <p className="text-[coral] font-medium text-sm text-center">
//                     {/* {errorMsg} */}
//                     It is compulsory to Upload a means of verification
//                   </p>
//                 )}
//                 <div className="grid md:grid-cols-2 gap-8 mt-10">
//                   <div>
//                     <input
//                       hidden
//                       type="file"
//                       name="Signature"
//                       accept="image/png, image/jpg, image/jpeg"
//                       id="signature"
//                       onChange={(e) => setSelectedSignature(e.target.files[0])}
//                     />
//                     <label htmlFor="Signature">
//                       <div
//                         role="button"
//                         className="bg-[#fff] flex justify-between  items-center border border-custom-primary text-left w-full p-3"
//                       >
//                         Signature or Thumbprint Upload
//                         {selectedSignature && (
//                           <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedSignature.name.slice(
//                             0,
//                             15
//                           )})`}</span>
//                         )}
//                       </div>
//                     </label>
//                   </div>
//                   {/* <CustomSelectInput
//                         required
//                         verifyRef={verifyRef}
//                         selectedVerify={selectedVerify}
//                         setSelectedVerify={setSelectedVerify}
//                         name="Means of verification"
//                         options={[
//                           "Means of verification",
//                           "Signature",
//                           "Thumbprint",
//                           "NIN",
//                         ]}
//                       /> */}
//                   {/* <div className="hidden">
//                       <input
//                         required
//                         hidden
//                         type="file"
//                         className="hidden"
//                         name="Means of verification (Image)"
//                         accept="image/png, image/jpg, image/jpeg"
//                         id="means_of_verifying"
//                         onChange={(e) =>
//                             setSelectedVerify(e.target.files[0])
//                         }
//                       />
//                       <label htmlFor="Means of verification" ref={verifyRef}
//                           className="hidden">
//                               Signature or Thumbprint Upload
//                               </label> */}
//                   {/* <div
//                           role="button"
//                           hidden
//                           onClick={() => setUploadSignature(true)}
//                           className="bg-[#fff]  flex justify-between  items-center border border-custom-primary text-left w-full p-3"
//                         > */}
//                   {/* {selectedSignature && (
//                             <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedSignature.name.slice(
//                               0,
//                               15
//                             )})`}</span>
//                           )} */}
//                   {/* </div> */}
//                   {/* </div> */}
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
//         placeholder={placeholder}
//         type={type}
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
//   value,
//   onChange,
//   verifyRef,
//   // proofRef,
//   selectedVerify,
//   setSelectedVerify,
//   // selectedProof,
//   // setSelectedProof,
//   required,
//   //   }) =>
// }) => {
//   return (
//     <div className={`relative w-full mb-6`}>
//       {/* <label className="block text-sm font-medium text-gray-700">
//                 {name}
//             </label> */}
//       <select
//         required={required ? true : false}
//         // className={`block w-full px-3 py-2 text-sm leading-tight text-gray-700 border-gray-300 rounded-md focus:outline-none focus:border-blue-300 ${
//         //     required && "border-red-500"
//         // }`}
//         name={name}
//         value={value}
//         onChange={(e) => {
//           if (name === "Means of verification") {
//             setSelectedVerify(e.target.value);
//             verifyRef.current.click();
//           } else {
//             onChange(e);
//           }
//           // setCashOption(e.target.value)
//           // cashOptionRef.current.click()
//         }}
//         // defaultValue="some random test value"
//         className="outline-none border h-[50px] border-custom-primary placeholder:font-semibold bg-[#fff] p-3 w-full capitalize"
//       >
//         <option value="">{name}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <p className="italic text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-5 sm:right-10">
//         {name == "Please tick in the box to indicate preferred option" &&
//         selectedVerify != undefined
//           ? `${selectedVerify?.name?.slice(0, 15)}`
//           : //   : name == "Means of Identification" && selectedVerify != undefined
//             //   ? `${selectedVerify?.name?.slice(0, 15)}`
//             null}
//       </p>
//     </div>
//   );
// };

// export default halalFixed;
