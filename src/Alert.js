import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Alert = ({ show, type, message, setAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [show]);

  return (
    <>
      <p className={`alert alert-${type}`}>{message}</p>
    </>
  );
};

export default Alert;
