import React, {useEffect, useState} from "react";
import GenericEditModal from "./GenericEditModal";
import { Room, RoomUpdate } from "../Types/Room";
import useUpdateRoom from "../Hooks/useUpdateRoom";
import roomType from "../Enums/roomType";
import { useForm } from "react-hook-form";

interface RoomEditModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomEditModal = ({ room, isOpen, onClose }: RoomEditModalProps) => {
  const { updateRoom, isRoomUpdating } = useUpdateRoom();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const {
    setValue,
    reset,
  } = useForm<RoomUpdate>({
    defaultValues: {
      type: room?.type || "",
      beds: room?.beds || 1,
      capacity: room?.capacity || 1,
      price: room?.price || 0,
    },
  });

  useEffect(() => {
    if (room) {
      reset({
        type: room.type,
        beds: room.beds,
        capacity: room.capacity,
        price: room.price,
      });

      if (room.image) {
        setImagePreview(`data:image/png;base64,${room.image}`);
        setImageData(room.image);
      } else {
        setImagePreview(null);
        setImageData(null);
      }
    }
  }, [room, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64StringRequest = (reader.result as string).split(",")[1];
      setImagePreview(base64String);
      setImageData(base64StringRequest);
      setValue("image", base64StringRequest, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (data: RoomUpdate) => {
    if (!room) return;

    console.log("UPDATE DATA: ", data);

    const submitData = {
      ...data,
      image: imageData || data.image
    };

    updateRoom(
      { roomId: room.id, updatedData: submitData },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const editFields = [
    {
      name: 'type',
      label: 'Room Type',
      type: 'select',
      options: Object.values(roomType),
      required: true
    },
    {
      name: 'beds',
      label: 'Beds',
      type: 'number',
      min: 1,
      max: 5,
      required: true
    },
    {
      name: 'image-preview',
      label: 'Image Preview',
      type: 'image-preview'
    },
    {
      name: 'image',
      label: 'Upload Image',
      type: 'file'
    },
    {
      name: 'capacity',
      label: 'Capacity (people)',
      type: 'number',
      min: 1,
      max: 10,
      required: true
    },
    {
      name: 'price',
      label: 'Price ($)',
      type: 'number',
      min: 0,
      max: 1000,
      step: '0.01',
      required: true
    }
  ];

  return (
    <GenericEditModal
      item={room}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditSubmit}
      isUpdating={isRoomUpdating}
      title={(room) => `Edit Room: ${room?.type}`}
      fields={editFields}
      imagePreview={imagePreview}
      onFileChange={handleFileChange}
      setValue={setValue}
    />
  );
};

export default RoomEditModal;
