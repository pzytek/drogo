import * as yup from "yup";

//only letters, spaces
const nameRegex = /^[A-Za-z][A-Za-z ]*$/;

//only numbers, spaces and hyphens
const codeRegex = /^[0-9 -]+$/;

//only positive numbers, dot and 2 numbers after dot
const priceRegex = /^[1-9]\d*(\.\d{1,2})?$/;

//only positive integer numbers
const countRegex = /^(0|[1-9]\d*)$/;

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegex, "Name can only consist of letters and spaces")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must consist of min. 5 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password"),
});

const shippingSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("Email is required"),
  postalCode: yup
    .string()
    .matches(codeRegex, "Only numbers, spaces and hyphens (00-000)")
    .required("Postal code is required"),
  country: yup
    .string()
    .matches(nameRegex, "Only letters and spaces")
    .required("Country is required"),
});

const productSchema = yup.object().shape({
  name: yup.string().max(35, "Maximum length: 35").required("Name is required"),
  price: yup
    .string()
    .matches(priceRegex, "Only numbers and dots (37.99, 37)")
    .required("Price is required"),
  category: yup
    .string()
    .matches(nameRegex, "Category can only consist of letters and spaces")
    .max(12, "Maximum length: 12")
    .required("Category is required"),
  brand: yup
    .string()
    .matches(nameRegex, "Brand can only consist of letters and spaces")
    .required("Brand is required"),
  count: yup
    .string()
    .matches(countRegex, "Only non-negative integer numbers")
    .required("Count is required"),
  description: yup
    .string()
    .max(200, "Maximum length: 200")
    .required("Description is required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export { registerSchema, shippingSchema, productSchema, loginSchema };
