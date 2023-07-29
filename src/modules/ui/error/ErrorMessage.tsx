import React from "react";

interface IProps {
    message: string;
}

let ErrorMessage: React.FC<IProps> = (props) => {
  return <>Error : <small className="text-danger">{props.message}</small></>;
};

export default ErrorMessage;