import React from "react";

interface IProps {
  heading: string;
  color: string;
}

let ContactHeader: React.FC<IProps> = (props) => {
  return (
    <>
     
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className={`h3 ${props.color}`}>{props.heading}</p>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aut
              sed, voluptate nesciunt alias eligendi optio molestiae? Ea
              corrupti ut cum ex repellendus sed, animi eligendi minus nam
              aperiam, eos nihil dolor reiciendis, assumenda saepe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactHeader;
