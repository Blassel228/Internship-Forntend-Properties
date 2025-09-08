import SettingsCancelButton from "./SettingsCancelButton.tsx";

const SettingsChangeButton = ({ onClick, disabled, children }) => {
  return (
    <SettingsCancelButton
      type="button"
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </SettingsCancelButton>
  );
};

export default SettingsChangeButton;
