import React, { useEffect, useState } from "react";
import ContactHeader from "../../components/contact-header/ContactHeader";
import { Link, useNavigate } from "react-router-dom";
import { IContact } from "../../models/IContact";
import { IGroup } from "../../models/IGroup";
import { GroupService } from "../../services/GroupService";
import Spinner from "../../../ui/spinner/Spinner";
import { ContactService } from "../../services/ContactService";
import { ToastUtil } from "../../../../util/ToastUtil";

interface Istate {
  loading: boolean;
  contact: IContact;
  groups: IGroup[];
  errorMessage: string;
}
let AddContact: React.FC = () => {
  const navigate = useNavigate();

  let [state, setState] = useState<Istate>({
    loading: false,
    contact: {
      name: "",
      imageUrl: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    } as IContact,
    groups: [] as IGroup[],
    errorMessage: "",
  });

  useEffect(() => {
    const getAllGroups = async () => {
      setState({
        ...state,
        loading: true,
      });
      try {
        let response = await GroupService.getAllGroups();
        setState({
          ...state,
          groups: response.data,
          loading: false,
        });
      } catch (error: any) {
        setState({
          ...state,
          errorMessage: error.message,
        });
      }
    };
    getAllGroups().then((r) => r);
  }, []);

  //disable 'CREATE' button unless all fields are filled
  let checkForEmptyFields = (): boolean => {
    for(let key of Object.keys(state.contact) as (keyof typeof state.contact)[]){
      if(state.contact[key] === ""){
        return true;
      }
    }
    return false;
  }

  const updateUserInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitCreateContact = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    ContactService.createContact(state.contact)
      .then((response) => {
        navigate("/contacts/admin");
        ToastUtil.displaySuccessToast("Contact Created!");
      })
      .catch((err) => {
        ToastUtil.displayErrorToast("Contact Creation Failed!");
        navigate("/contacts/add");
      });
  };

  let { loading, contact, errorMessage, groups } = state;
  return (
    <>
      {loading && groups.length === 0 && <Spinner />}

      {!loading && groups.length > 0 && 
        <>
          <ContactHeader heading={"Add Contact"} color={"text-success"} />
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <form onSubmit={(e) => submitCreateContact(e)}>
                  <div className="m-2">
                    <input
                      value={contact.name}
                      name={"name"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.imageUrl}
                      name={"imageUrl"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.mobile}
                      name={"mobile"}
                      onChange={(e) => updateUserInput(e)}
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.email}
                      name={"email"}
                      onChange={(e) => updateUserInput(e)}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.company}
                      name={"company"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.title}
                      name={"title"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="m-2">
                    <select
                      value={contact.groupId}
                      name={"groupId"}
                      onChange={(e) => updateUserInput(e)}
                      className="form-control"
                    >
                      <option value="">Select Group</option>
                      {groups.map((group, index) => {
                        return (
                          <option key={index} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="m-2">
                    <input
                      disabled={checkForEmptyFields()}
                      type="submit"
                      className="btn btn-success"
                      value={"Create"}
                    />
                    <Link to={"/contacts/admin"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-sm-3">
                <img
                  src={contact.imageUrl}
                  alt=""
                  className="img-fluid rounded-circle shadow-lg"
                />
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
};

export default AddContact;
