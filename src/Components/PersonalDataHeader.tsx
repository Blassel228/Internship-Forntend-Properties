import Row from "./Row.tsx";

export default function PersonalDataHeader() {
  return (
    <Row className="user-setting w-2/3 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Personal Data</h1>
        <p className="text-gray-600 mt-2">
          You can see and renew your personal data here.
        </p>
      </div>
    </Row>
  );
}