const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

export default FieldError;
