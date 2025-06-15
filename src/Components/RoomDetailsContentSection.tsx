export const RoomDetailsContentSection = ({ room }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Description</h2>
      <p className="mb-4">{room.description}</p>
    </div>
  );
};
