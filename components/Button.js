// export default function Button({ onClick, text }) {
//     return (
//       <button
//       // md:px-6 md:py-2
//         className={`flex items-center justify-center space-x-3 transition-all px-[52px] py-[16px] rounded-3xl duration-300  font-medium bg-primary hover:bg-white hover:text-primary hover:border border border-primary text-white`}
//         onClick={onClick}
//       >
//         {text}
//       </button>
//     );
// }

import React from "react";

const Button = React.forwardRef(({ onClick, text, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...props}
      className="flex items-center justify-center space-x-3 transition-all px-[52px] py-[16px] rounded-3xl duration-300 font-medium bg-primary hover:bg-white hover:text-primary hover:border border border-primary text-white"
    >
      {text}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
