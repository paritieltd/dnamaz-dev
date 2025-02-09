import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ menuItems }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const router = useRouter()

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click ? styles.dropdown_menu && styles.clicked : styles.dropdown_menu
        }
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="p-1">
              <div
                className={styles.dropdown_link}
                onClick={() => {
                  router.push(item.path);
                  setClick(false);
                }}
              >
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
