export default function Button({ onClick, text }) {
    return (
      <button
        className={`flex items-center justify-center space-x-3 transition-all px-3 py-1 md:px-6 md:py-2 rounded-xl duration-300  font-medium bg-primary hover:bg-white hover:text-primary hover:border border-primary text-white`}
        onClick={onClick}
      >
        {text}
      </button>
    );
}