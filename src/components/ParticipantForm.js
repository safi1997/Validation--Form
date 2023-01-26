import React from "react";
import { BASE_URL } from "../config/config";
import { useFormik } from "formik";
import * as Yup from "yup";

function ParticipantForm({ getData }) {
  ////the initial formState
  const addParticipant = async (addNames) => {
    const personList = {
      first_name: addNames.firstName,
      last_name: addNames.lastName,
      email: addNames.email,
    };
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(personList),
    });
    await getData();
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Required")
        .max(15, "first name must be at least 15 characters long"),
      lastName: Yup.string()
        .required("Required")
        .max(15, "last name must be at least 15 characters long"),
      email: Yup.string().required("Required").email("Invalid email address"),
    }),
    onSubmit: (values, index) => {
      addParticipant(values, null, 2);
      index.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Add participant</h1>
      <div className="mb-3">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handle}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.firstName}
          </div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handle}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.lastName}
          </div>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="alert alert-danger" role="alert">
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default ParticipantForm;
