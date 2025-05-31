import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/router";

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
    const bvnLength = formData.bvn.length;
    return bvnLength === 11;
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
        setErrorMsg("Note: Phone number must be at least 10 digits");
        return false;
      }
      if (!isDigitsOnly(formData.bvn)) {
        setErrorMsg("Note: BVN must contain only digits");
        return false;
      }
      if (!isDigitsOnly(formData.phone)) {
        setErrorMsg("Note: Phone number must contain only digits");
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
        setErrorMsg(
          "Note: Next of Kin phone number must be at least 10 digits"
        );
        return false;
      }
      if (!isDigitsOnly(formData.kin_phone)) {
        setErrorMsg("Note: Next of Kin phone number must contain only digits");
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
      if (!selectedId) {
        setErrorMsg("Please upload a Means of Identification");
        return false;
      }
      if (!selectedProof) {
        setErrorMsg("Please upload a Proof of Address");
        return false;
      }
      if (!selectedSignature) {
        setErrorMsg("Please upload a Signature");
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

    // Validate all steps before submission
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
    if (selectedId) {
      formDataToSubmit.append("means_of_identification_image", selectedId);
    }
    if (selectedProof) {
      formDataToSubmit.append("proof_of_address_image", selectedProof);
    }
    formDataToSubmit.append("created", new Date().toISOString());
    formDataToSubmit.append("form_category", "Single Investor");

    // const sheetMonkeyUrl =
    //   "https://api.sheetmonkey.io/form/3hiHfcG3qBz46eMoku8Qxk";
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
                <div className={`${activeStep === 1 && "!block"} hidden`}>
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="other_name"
                      name="other_name"
                      placeholder="Other Name"
                      value={formData.other_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          other_name: e.target.value,
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
                      name="date_of_birth"
                      placeholder="Date Of Birth"
                      className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
                      value={formData.date_of_birth}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          date_of_birth: e.target.value,
                        }));
                      }}
                    />
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
                        value={formData.bvn}
                        onChange={(e) => handleNumberInputChange(e, "bvn")}
                      />
                      {!isBvnValid() && formData.bvn && (
                        <p className="text-xs sm:text-sm text-[coral]">
                          <span className="font-medium">Note:</span> BVN must be
                          exactly 11 digits
                        </p>
                      )}
                    </div>
                    <CustomTextInput
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleNumberInputChange(e, "phone")}
                    />
                    <CustomTextInput
                      required
                      id="mothers_name"
                      name="mothers_name"
                      placeholder="Mother Maiden Name"
                      value={formData.mothers_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          mothers_name: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="occupation"
                      name="occupation"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          occupation: e.target.value,
                        }));
                      }}
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
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Next of Kin Info
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="kin_first_name"
                      name="kin_first_name"
                      placeholder="First Name"
                      value={formData.kin_first_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_first_name: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_other_name"
                      name="kin_other_name"
                      placeholder="Other Name"
                      value={formData.kin_other_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_other_name: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_last_name"
                      name="kin_last_name"
                      placeholder="Last Name"
                      value={formData.kin_last_name}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_last_name: e.target.value,
                        }));
                      }}
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
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_relationship: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_address"
                      name="kin_address"
                      placeholder="Home Address"
                      value={formData.kin_address}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_address: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_occupation"
                      name="kin_occupation"
                      placeholder="Occupation"
                      value={formData.kin_occupation}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          kin_occupation: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="kin_phone"
                      name="kin_phone"
                      placeholder="Mobile Number"
                      type="text"
                      value={formData.kin_phone}
                      onChange={(e) => handleNumberInputChange(e, "kin_phone")}
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
                <div className={`${activeStep === 3 && "!block"} hidden`}>
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
                    Address Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <CustomTextInput
                      required
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }));
                      }}
                    />
                    <CustomTextInput
                      required
                      id="street"
                      name="street"
                      placeholder="Street"
                      value={formData.street}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          street: e.target.value,
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
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => {
                        setErrorMsg("");
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }));
                      }}
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
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
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
                          onChange={(e) => setSelectedId(e.target.files[0])}
                        />
                        <label
                          ref={idRef}
                          htmlFor="means_of_id"
                          className="hidden"
                        >
                          Means of Identification Image
                        </label>
                      </div>
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
                          // ref={proofRef}
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          hidden
                          id="proof_of_address"
                          name="proof_of_address"
                          onChange={(e) => setSelectedProof(e.target.files[0])}
                        />
                        <label
                          ref={proofRef}
                          htmlFor="proof_of_address"
                          className="hidden"
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
              {/* Step 5 */}
              {true && (
                <div className={`${activeStep === 5 && "!block"} hidden`}>
                  <h3 className="text-3xl text-center font-bold text-custom-primary">
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

// import React, { useRef, useState } from "react";
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
//   const [completedStep, setCompletedStep] = useState(0);
//   const [formSteps, setFormSteps] = useState([
//     {
//       name: "Personal Information",
//       active: true,
//     },
//     {
//       name: "Next of Kin",
//       active: false,
//     },
//     {
//       name: "Address Information",
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
//     title: "",
//     firstName: "",
//     lastName: "",
//     otherName: "",
//     dob: "",
//     email: "",
//     gender: "",
//     bvn: "",
//     phone: "",
//     mother: "",
//     occupataion: "",
//     kinFirstName: "",
//     KinOtherName: "",
//     KinLastName: "",
//     kinEmail: "",
//     kinRel: "",
//     kinAddress: "",
//     kinOccupation: "",
//     kinPhone: "",
//     address: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
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
//         firstName,
//         lastName,
//         dob,
//         email,
//         gender,
//         bvn,
//         phone,
//         mother,
//         occupataion,
//       ]);
//       if (res) {
//         setErrorMsg("Note: All fields except 'Title' are compulsory");
//         return;
//       }

//       if (validMail(email) == false) {
//         setErrorMsg("Please enter a valid email address");
//         return;
//       }

//       if (isBvnValid() == false) {
//         setErrorMsg("Note: Bvn must be exactly 10 numbers");
//         return;
//       }
//     } else if (currentStep === 2) {
//       const res = isAnyValueEmpty([
//         kinFirstName,
//         KinOtherName,
//         KinLastName,
//         kinEmail,
//         kinRel,
//         kinAddress,
//         kinOccupation,
//         kinPhone,
//       ]);
//       if (res) {
//         setErrorMsg("Note: All fields are compulsory. Fill to continue !!!");
//         return;
//       }
//       if (validMail(kinEmail) === false) {
//         setErrorMsg("Please enter a valid email address");
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

//   const {
//     title,
//     firstName,
//     lastName,
//     otherName,
//     dob,
//     email,
//     gender,
//     bvn,
//     phone,
//     mother,
//     occupataion,
//     kinFirstName,
//     KinOtherName,
//     KinLastName,
//     kinEmail,
//     kinRel,
//     kinAddress,
//     kinOccupation,
//     kinPhone,
//     address,
//     street,
//     city,
//     state,
//     country,
//     timeFrame,
//     specify,
//     amount,
//   } = formData;

//   function isBvnValid() {
//     return bvn.length === 10 ? true : false;
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
//               autoComplete="new-password"
//               action="https://api.sheetmonkey.io/form/d9L7BaXFZnm7Hiu25HhnmG"
//               method="POST"
//               encType="multipart/form-data"
//               className="flex flex-col flex-1 max-w-[800px] justify-center mx-auto"
//             >
//               <input
//                 name="Account Type"
//                 value="Single Investor"
//                 id="accountType"
//                 hidden
//               />
//               <input
//                 type="hidden"
//                 name="x-sheetmonkey-redirect"
//                 value="https://dnamaz-update.vercel.app/success"
//               />
//               {/* Step 1 */}
//               {true && (
//                 <div className={`${activeStep === 1 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Personal Information
//                   </h3>
//                   {activeStep === 1 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomSelectInput
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
//                     />
//                     <CustomTextInput
//                       required
//                       id="firstname"
//                       name="Firstname"
//                       placeholder="First Name"
//                       value={firstName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           firstName: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="lastname"
//                       name="Lastname"
//                       placeholder="Last Name"
//                       value={lastName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           lastName: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="othername"
//                       name="Other names"
//                       placeholder="Other Name"
//                       value={otherName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           otherName: e.target.value,
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
//                       name="Date of Birth"
//                       placeholder="Date of Birth"
//                       className="px-3 outline-none border h-[50px] border-custom-primary bg-[#fff]"
//                       value={dob}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           dob: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       type="email"
//                       id="email"
//                       name="Email"
//                       placeholder="Email Address"
//                       value={email}
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
//                       name="Gender"
//                       options={[
//                         "select gender",
//                         "male",
//                         "female",
//                         "prefer not to say",
//                       ]}
//                       value={gender}
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
//                         name="BVN"
//                         type="number"
//                         placeholder="Bank Verfication Number"
//                         value={bvn}
//                         onChange={(e) => {
//                           // console.log(e);
//                           setErrorMsg("");
//                           setFormData((prev) => ({
//                             ...prev,
//                             bvn: e.target.value,
//                           }));
//                         }}
//                       />
//                       {!isBvnValid() && (
//                         <p className="text-xs sm:text-sm text-[coral]">
//                           <span className="font-medium">Note:</span> BVN
//                           can&#39;t be less or more than 10 numbers
//                         </p>
//                       )}
//                     </div>
//                     <CustomTextInput
//                       required
//                       id="phone"
//                       name="Phone"
//                       type="number"
//                       placeholder="Phone Number"
//                       value={phone}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           phone: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="mothername"
//                       name="Mother's Name"
//                       placeholder="Mother Maiden Name"
//                       value={mother}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           mother: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="occupation"
//                       name="Occupation"
//                       placeholder="Occupation"
//                       value={occupataion}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           occupataion: e.target.value,
//                         }));
//                       }}
//                     />
//                     <div></div>
//                     <button
//                       onClick={() => {
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
//               {/* step 2 */}
//               {true && (
//                 <div className={`${activeStep === 2 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Next of Kin Info
//                   </h3>
//                   {activeStep === 2 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="firstname"
//                       name="Firstname (Next of Kin)"
//                       placeholder="First Name"
//                       value={kinFirstName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinFirstName: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="othername"
//                       name="Other Name"
//                       placeholder="Other Name"
//                       value={KinOtherName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           KinOtherName: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="lastname"
//                       name="Last Name (Next of Kin)"
//                       placeholder="Last Name"
//                       value={KinLastName}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           KinLastName: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="email"
//                       name="Email (Next of Kin)"
//                       placeholder="Email"
//                       value={kinEmail}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinEmail: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="relationship"
//                       name="Relationship"
//                       placeholder="Relationship"
//                       value={kinRel}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinRel: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="homeAddress"
//                       name="Home Address"
//                       placeholder="Home Address"
//                       value={kinAddress}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinAddress: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="occupation"
//                       name="Occupation (Next of Kin)"
//                       placeholder="Occupation"
//                       value={kinOccupation}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinOccupation: e.target.value,
//                         }));
//                       }}
//                     />
//                     <CustomTextInput
//                       required
//                       id="phone"
//                       name="Mobile Number"
//                       placeholder="Mobile Number"
//                       type="number"
//                       value={kinPhone}
//                       onChange={(e) => {
//                         setErrorMsg("");
//                         setFormData((prev) => ({
//                           ...prev,
//                           kinPhone: e.target.value,
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
//               {/* step 3 */}
//               {true && (
//                 <div className={`${activeStep === 3 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Address Information
//                   </h3>
//                   {activeStep === 3 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}
//                   <div className="grid md:grid-cols-2 gap-8 mt-10">
//                     <CustomTextInput
//                       required
//                       id="address"
//                       name="Address"
//                       placeholder="Address"
//                       value={address}
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
//                       name="Street"
//                       placeholder="Street"
//                       value={street}
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
//                       value={city}
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
//                       name="State"
//                       placeholder="State"
//                       value={state}
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
//                       name="Country"
//                       placeholder="Country"
//                       value={country}
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
//                         validateForm();
//                         topDiv.current.scrollIntoView();
//                         // setActiveStep(4);
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* step 4 */}
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
//                     {/* password no more needed */}
//                     {/* <div>
//                       <input
//                         hidden
//                         type="file"
//                         name="Passport"
//                         accept="image/png, image/jpg, image/jpeg"
//                         id="passport"
//                         onChange={(e) => setSelectedPassport(e.target.files[0])}
//                       />
//                       <label htmlFor="passport">
//                         <div
//                           role="button"
//                           // onClick={() => setUploadPassport(true)}
//                           className="bg-[#fff] text text-base justify-between  flex items-center border border-[#dddddd] text-left w-full p-3"
//                         >
//                           <p>
//                             Passport Photograph
//                             <span className="ml-1 hidden sm:inline">
//                               Upload
//                             </span>
//                           </p>
//                           {selectedPassport && (
//                             <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedPassport.name.slice(
//                               0,
//                               15
//                             )})`}</span>
//                           )}
//                         </div>
//                       </label>
//                     </div> */}
//                     <div></div>
//                     <button
//                       onClick={() => {
//                         topDiv.current.scrollIntoView();
//                         setActiveStep(5);
//                       }}
//                       type="button"
//                       className="text-white px-20 h-[50px] bg-custom-primary w-fit font-medium"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {/* step 5 */}
//               {true && (
//                 <div className={`${activeStep === 5 && "!block"} hidden`}>
//                   <h3 className="text-3xl text-center font-bold text-custom-primary">
//                     Investment Info
//                   </h3>
//                   {activeStep === 5 && errorMsg && (
//                     <p className="text-[coral] font-medium text-sm text-center">
//                       {errorMsg}
//                     </p>
//                   )}
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
//                       onClick={() => validateForm(true)}
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

// export default SingleInvestor;
