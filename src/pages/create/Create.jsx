import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import "./Create.css";

// this is for the categories later
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  // fetching users for the Assignment selector
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a Category!");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please select who will Qollide with this project!");
      return;
    }
    console.log(name, details, dueDate, category.value, assignedUsers);
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Hop into a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Due Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Qollide with:</span>
          <Select
            onChange={(options) => setAssignedUsers(options)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Let's Go!</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
