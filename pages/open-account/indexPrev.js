import { useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";

const OpenAccount = ({}) => {
  const [step, setStep] = useState(1);
  const [uploadSignature, setUploadSignature] = useState(false);
  const [uploadPassport, setUploadPassport] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState();
  const [selectedSignature, setSelectedSignature] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedProof, setSelectedProof] = useState();
  const [highlight, setHighlight] = useState(false);
  const signatureRef = useRef();
  const passportRef = useRef();
  const idRef = useRef();
  const proofRef = useRef();

  const previewImage = (e, type) => {
    ("start");
    if (type == "signature") {
      setSelectedSignature(e.target.files[0]);
    } else {
      setSelectedPassport(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      if (type == "signature") {
        signatureRef.current.src = e.target.result;
      } else {
        passportRef.current.src = e.target.result;
      }
      e.target;
    });
    reader.readAsDataURL(e.target.files[0]);
    ("end");
  };

  function handleDragOver(e) {
    e.preventDefault();
    setHighlight(true);
  }
  function handleDragEnter(e) {
    e.preventDefault();
    setHighlight(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    setHighlight(false);
  }

  function handleDrop(e, type) {
    e.preventDefault();
    setHighlight(false);
    const data = e.dataTransfer;
    const file = data.files[0];
    if (type == "signature") {
      setSelectedSignature(file);
    } else {
      setSelectedPassport(file);
    }

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      if (type == "signature") {
        signatureRef.current.src = e.target.result;
      } else {
        passportRef.current.src = e.target.result;
      }
    });
    reader.readAsDataURL(file);
  }

  const Modal = ({ children }) => {
    return (
      <div className=" bg-[#1D5506] z-[1000] fixed top-0 left-0 w-screen overflow-auto px-4 sm:px-10 py-14 h-screen bg-opacity-50  sm:grid justify-center items-center">
        {children}
      </div>
    );
  };

  selectedProof;
  selectedId;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />
      <div className="h-40"></div>
      <div className="">
        <form
          action="https://api.sheetmonkey.io/form/d9L7BaXFZnm7Hiu25HhnmG"
          method="POST"
          encType="multipart/form-data"
          className={` mx-auto relative px-4 pt-4 sm:pt-10 py-10 sm:p-10 w-full sm:max-w-[1000px]`}
        >
          <p className="text-3xl text-center font-bold mb-2 mt-5">
            Open Account
          </p>
          <p className="text-center">Enter details to open an account</p>
          <div className="mx-auto grid sm:grid-cols-2 gap-0 sm:gap-7 ">
            <div className="relative flex flex-col gap-7 mt-10">
              <CustomTextInput id="title" name="Title" placeholder="Title" />
              <CustomTextInput
                required
                id="firstname"
                name="Firstname"
                placeholder="First Name"
              />
              <CustomTextInput
                required
                id="lastname"
                name="Lastname"
                placeholder="Last Name"
              />
              <CustomTextInput
                required
                type="email"
                id="email"
                name="Email"
                placeholder="Email Address"
              />
              <CustomTextInput
                required
                id="mothername"
                name="Mother's Name"
                placeholder="Mother Maiden Name"
              />
              {/* <CustomTextInput
                id="dob"
                name="Date of Birth"
                placeholder="Date of Birth"
              /> */}
              <input
                required
                type="text"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                // type="date"
                name="Date of Birth"
                placeholder="Date of Birth"
                className="px-3 outline-none border h-[50px] border-[#dddddd] bg-[#fff]"
              />
              <CustomTextInput
                id="country"
                name="Country"
                placeholder="Country"
                required
              />
              <CustomTextInput
                required
                id="state"
                name="State"
                placeholder="State of Origin"
              />
            </div>
            <div className={` flex flex-col gap-7 mt-10 `}>
              {/* <input
                type="file"
                name="My File"
                accept="image/png, image/jpg, image/jpeg"
              /> */}
              <CustomSelectInput
                required
                name="Gender"
                options={[
                  "select gender",
                  "male",
                  "female",
                  "prefer not to say",
                ]}
              />
              <CustomTextInput
                required
                id="bvn"
                name="BVN"
                placeholder="Bank Verfication Number"
              />
              <CustomTextInput
                required
                id="phone"
                name="Phone"
                placeholder="Phone Number"
              />
              <div>
                <CustomSelectInput
                  required
                  idRef={idRef}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  name="Means of Identification"
                  options={[
                    "Means of Identification",
                    "International Passport",
                    "Driver's License",
                    "NIN",
                  ]}
                />
                <div className="hidden">
                  <input
                    required
                    className="hidden"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    hidden
                    id="means_of_id"
                    name="Means of Identification (Image)"
                    onChange={(e) => setSelectedId(e.target.files[0])}
                  />
                  <label ref={idRef} className="hidden" htmlFor="means_of_id">
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
                  name="Proof of Address"
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
                    name="Proof of Address (Image)"
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
                  name="Signature"
                  accept="image/png, image/jpg, image/jpeg"
                  id="signature"
                  onChange={(e) => setSelectedSignature(e.target.files[0])}
                />
                <label htmlFor="signature">
                  <div
                    role="button"
                    // onClick={() => setUploadSignature(true)}
                    className="bg-[#fff] flex justify-between  items-center border border-[#dddddd] text-left w-full p-3"
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
              <div>
                <input
                  hidden
                  type="file"
                  name="Passport"
                  accept="image/png, image/jpg, image/jpeg"
                  id="passport"
                  onChange={(e) => setSelectedPassport(e.target.files[0])}
                />
                <label htmlFor="passport">
                  <div
                    role="button"
                    // onClick={() => setUploadPassport(true)}
                    className="bg-[#fff] text text-base justify-between  flex items-center border border-[#dddddd] text-left w-full p-3"
                  >
                    <p>
                      Passport Photograph
                      <span className="ml-1 hidden sm:inline">Upload</span>
                    </p>
                    {selectedPassport && (
                      <span className="ml-2 italic text-xs sm:text-sm">{`(${selectedPassport.name.slice(
                        0,
                        15
                      )})`}</span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={() => {}}
            className="mx-auto mb-4 mt-14 px-20 py-4 rounded-md bg-[#1D5506] text-white grid place-content-center "
          >
            Submit
          </button>
          {uploadSignature && (
            <Modal>
              <div className="bg-white p-6 pt-8 w-full sm:w-[450px]">
                <div className="flex justify-between items-center">
                  <p className="text-xl sm:text-2xl font-medium mb-1">
                    Upload Signature
                  </p>
                  <p
                    onClick={() => {
                      setUploadSignature(false);
                      setSelectedSignature();
                    }}
                    className="font-semibold text-xl scale-150 cursor-pointer"
                  >
                    &times;
                  </p>
                </div>
                {!selectedSignature ? (
                  <p>Please attach images</p>
                ) : (
                  <p>Selected Image</p>
                )}
                {!selectedSignature ? (
                  <div
                    onDragEnd={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "signature")}
                    className={`border-2 border-dashed border-[gainsboro] p-5 mt-5 ${
                      highlight && "border-[#1D5506]"
                    }`}
                  >
                    <img
                      src="/images/select-image.png"
                      alt="select file"
                      className="mt-5 w-32 mx-auto mb-8"
                    />
                    <div>
                      <input
                        hidden
                        onChange={(e) => previewImage(e, "signature")}
                        accept="image/png, image/jpg, image/jpeg"
                        type="file"
                        id="signature"
                        name="signature"
                      />
                      <p className="text-center text-sm pt-5">
                        Please drag and drop or{" "}
                        <label
                          className="italic font-medium cursor-pointer text-[#1D5506]"
                          htmlFor="signature"
                        >
                          Select File
                        </label>{" "}
                        from computer{" "}
                      </p>
                      <p className="text-sm text-center mt-2">
                        Images (in jpeg or png format only)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      className="w-[150px] h-[225px] mt-10 mx-auto object-cover"
                      ref={signatureRef}
                    />
                  </div>
                )}
                <button
                  type="button"
                  disabled={!selectedSignature}
                  onClick={() => {}}
                  className={`mt-8 bg-[#1D5506] text-white grid place-content-center w-full p-3 ${
                    !selectedSignature && "opacity-50"
                  }`}
                >
                  Upload Image
                </button>
              </div>
            </Modal>
          )}
          {uploadPassport && (
            <Modal>
              <div className="bg-white p-6 pt-8 w-full sm:w-[450px] ">
                <div className="flex justify-between items-center">
                  <p className="text-xl sm:text-2xl font-medium mb-1">
                    Upload Your Passport
                  </p>
                  <p
                    onClick={() => {
                      setUploadPassport(false);
                      setSelectedPassport();
                    }}
                    className="font-semibold text-xl scale-150 cursor-pointer"
                  >
                    &times;
                  </p>
                </div>
                {!selectedPassport ? (
                  <p>Please attach images</p>
                ) : (
                  <p>Selected Image</p>
                )}
                {!selectedPassport ? (
                  <div
                    onDragEnd={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed border-[gainsboro] p-5 mt-5 ${
                      highlight && "border-[#1D5506]"
                    }`}
                  >
                    <img
                      src="/images/select-image.png"
                      alt="select file"
                      className="mt-5 w-32 mx-auto mb-8"
                    />
                    <div>
                      <input
                        hidden
                        onChange={(e) => previewImage(e, "passport")}
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        id="passport"
                        name="Passport"
                      />
                      <p className="text-center text-sm pt-5">
                        Please drag and drop or{" "}
                        <label
                          className="italic font-medium cursor-pointer text-[#1D5506]"
                          htmlFor="passport"
                        >
                          Select File
                        </label>{" "}
                        from computer{" "}
                      </p>
                      <p className="text-sm text-center mt-2">
                        Images (in jpeg or png format only)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      className="w-[150px] h-[225px] mt-10 mx-auto object-cover"
                      ref={passportRef}
                    />
                  </div>
                )}
                <button
                  type="button"
                  disabled={!selectedPassport}
                  onClick={() => {}}
                  className={`mt-8 bg-[#1D5506] text-white grid place-content-center w-full p-3 ${
                    !selectedPassport && "opacity-50"
                  }`}
                >
                  Upload Image
                </button>
              </div>
            </Modal>
          )}
          {/* <input
            type="hidden"
            name="x-sheetmonkey-redirect"
            value="https://dnamaz-update.vercel.app"
          /> */}
        </form>
      </div>
    </div>
  );
};

const CustomTextInput = ({ placeholder, name, id, type, required }) => {
  return (
    <div className="w-full">
      <input
        required={required ? true : false}
        className="outline-none bg-white border border-[#dddddd] p-3 w-full"
        name={name}
        id={id}
        placeholder={placeholder}
        type="text"
        autoComplete="off"
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
}) => {
  return (
    <div className="relative">
      <select
        required={required ? true : false}
        name={name}
        onChange={(e) => {
          if (name == "Proof of Address") {
            setSelectedProof(e.target.value);
            proofRef.current.click();
          } else if (name == "Means of Identification") {
            setSelectedId(e.target.value);
            idRef.current.click();
          }
        }}
        defaultValue="some random test value"
        className="outline-none border h-[50px] border-[#dddddd] bg-[#fff] p-3 w-full capitalize"
      >
        {options.map((item, idx) => (
          <option
            onClick={
              // name == "Proof of Address" ?
              (e) => "hello"
              // : null
            }
            key={idx}
            value={item}
            className="capitalize"
          >
            {" "}
            {item}{" "}
          </option>
        ))}
      </select>
      <p className="italic text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-5 sm:right-10">
        {name == "Proof of Address" && selectedProof != undefined
          ? `${selectedProof?.name?.slice(0, 15)}`
          : name == "Means of Identification" && selectedId != undefined
          ? `${selectedId?.name?.slice(0, 15)}`
          : null}
      </p>
    </div>
  );
};

export default OpenAccount;
