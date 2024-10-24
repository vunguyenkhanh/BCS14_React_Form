import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
  let [students, setStudents] = React.useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  let [filteredStudents, setFilteredStudents] = useState([]);
  let [editingStudent, setEditingStudent] = useState(null);

  const formik = useFormik({
    initialValues: {
      studentId: '',
      fullName: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema: Yup.object({
      studentId: Yup.string()
        .required('Mã SV không được để trống')
        .matches(/^[0-9]{6,8}$/, 'Mã SV phải là số và có độ dài từ 6 đến 8 ký tự'),
      fullName: Yup.string()
        .required('Họ tên không được để trống')
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,50}$/,
          'Họ tên phải là chữ và có độ dài từ 3 đến 50 ký tự'
        ),
      phoneNumber: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại phải là số và có độ dài từ 10 đến 11 ký tự'),
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email không được để trống')
        .matches(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
          'Email không hợp lệ'
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingStudent) {
        handleUpdate(values);
      } else {
        addStudent(values);
      }
      resetForm();
    },
  });

  let addStudent = (student) => {
    const studentExists = students.some((s) => s.studentId === student.studentId);
    if (studentExists) {
      alert('Mã SV đã tồn tại');
      return;
    }
    setStudents([...students, student]);
  };

  let handleEdit = (student) => {
    setEditingStudent(student);
    formik.setValues(student);
  };

  let handleUpdate = (values) => {
    setStudents(
      students.map((student) =>
        student.studentId === editingStudent.studentId ? { ...student, ...values } : student
      )
    );
    setEditingStudent(null);
  };

  let renderStudent = () => {
    return filteredStudents.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.studentId}</td>
          <td>{student.fullName}</td>
          <td>{student.phoneNumber}</td>
          <td>{student.email}</td>
          <td>
            <button onClick={() => handleEdit(student)} className="btn btn-primary">
              Chỉnh sửa
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          student.studentId.includes(searchQuery) ||
          student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.phoneNumber.includes(searchQuery) ||
          student.email.includes(searchQuery)
      )
    );
  }, [searchQuery, students]);

  return (
    <>
      <div className="container mt-4">
        <div className="bg-dark text-white p-3 mb-4">
          <h1 className="h4 mb-0">Thông tin sinh viên</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="studentId" className="form-label">
                Mã SV
              </label>
              <input
                type="text"
                className="form-control"
                id="studentId"
                name="studentId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.studentId}
              />
              {formik.touched.studentId && formik.errors.studentId ? (
                <div className="text-danger">{formik.errors.studentId}</div>
              ) : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="fullName" className="form-label">
                Họ tên
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-danger">{formik.errors.fullName}</div>
              ) : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="btn btn-success mb-4">
            {editingStudent ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
          </button>
        </form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sinh viên"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderStudent()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Form;
