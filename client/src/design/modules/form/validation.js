// Import the necessary React Query hook outside of the function
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';

// Function to validate email format
function isEmail(string) {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return re.test(string);
}

// Function to check for duplicate email
function isDuplicateEmail(value, dataUsers) {
  if (Array.isArray(dataUsers) && value.trim() !== '') {
    return dataUsers.some(user => user.email === value.trim());
  }
  return false;
}

// Function to check if value is dirty (not empty or zero)
function isDirty(value) {
  return value || value === 0;
}

// Function to validate email, including checking for duplication
export function email(value) {
  return (value) && (isEmail(value.trim()) ? null : 'Invalid email') ;
}
export function DuplicateEmail(value, dataUsers) {
  return (value) &&  (!isDuplicateEmail(value.trim(), dataUsers) ? null : 'Duplicate email');
}
// Function to check for required fields
export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}
