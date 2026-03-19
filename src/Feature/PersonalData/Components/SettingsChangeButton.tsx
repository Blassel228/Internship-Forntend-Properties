import CancelButton from "./CancelButton.tsx";

const SettingsChangeButton = ({ onClick, disabled, children }) => {
  return (
    <CancelButton type="button" onClick={() => onClick()} disabled={disabled}>
      {children}
    </CancelButton>
  );
};

export default SettingsChangeButton;
