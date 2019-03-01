import React, { useContext, useEffect } from "react";

import { UsersContext } from "../../providers/UsersProvider";

function DepartmentDropdownSelect(props) {
  const {
    departments,
    getDepartments,
    departmentInput,
    handleTextInputChange
  } = useContext(UsersContext);

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <select
      className="userlist__account-info-form__field__dropdown"
      id="UserDepartment"
      required
      name="setDepartmentInput"
      value={departmentInput}
      onChange={handleTextInputChange}
    >
      <option hidden value="">
        Select a department:
      </option>
      {departments &&
        departments.map(dept => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
    </select>
  );
}

export default DepartmentDropdownSelect;
