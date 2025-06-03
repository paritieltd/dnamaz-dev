import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const NigerianStatesSelect = ({ value, onChange, onBlur, required }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredStates = NIGERIAN_STATES.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        className="outline-none bg-white border border-custom-primary p-3 w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || "Select State"}</span>
        <FaChevronDown
          className={`w-3 h-3 text-gray-900 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 sticky top-0 bg-white"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {filteredStates.map((state) => (
            <div
              key={state}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(state);
                setIsOpen(false);
                setSearchTerm("");
                if (onBlur) onBlur(); 
              }}
            >
              {state}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
