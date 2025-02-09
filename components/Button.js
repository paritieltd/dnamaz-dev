export default function Button({ onClick, text }) {
    return (
      <button
      // md:px-6 md:py-2
        className={`flex items-center justify-center space-x-3 transition-all px-[52px] py-[24px] rounded-3xl duration-300  font-medium bg-primary hover:bg-white hover:text-primary hover:border border border-primary text-white`}
        onClick={onClick}
      >
        {text}
      </button>
    );
}