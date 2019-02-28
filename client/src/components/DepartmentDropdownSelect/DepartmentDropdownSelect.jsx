import React from "react";

function DepartmentDropdownSelect(props) {
  return (
    <select
      className="userlist__account-info-form__field__dropdown"
      id="UserDepartment"
      required
      name="setUserDepartmentInput"
      defaultValue=""
    >
      <option disabled value="">
        Select a department:
      </option>
    </select>
  );
}

export default DepartmentDropdownSelect;
