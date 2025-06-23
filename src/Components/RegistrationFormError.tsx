const RegistrationFormError = ({children, error}) => {
  return(
     <p className={`text-red-500 text-sm ${error ? "visible" : "invisible"}`}>{children}</p>
  )
}

export default RegistrationFormError;