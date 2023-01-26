import React from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../config/config";
import TrashIcon from "../TrashIcon";

function ParticipantTable({ participants, getData }) {
  const handleDelete = async (pId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const selectedParticipant = `${BASE_URL}/${pId}`;
      try {
        const response = await fetch(selectedParticipant, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
        getData();
      } catch (error) {
        console.error(error);
      }
      await Swal.fire("Deleted!", "the user has been deleted.", "success");
    }
  };
  return (
    <>
      <table className="text-light  table  table-hover table-bg table-bordered  table-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <th scope="row">{participant.id}</th>
              <td>{participant.first_name}</td>
              <td>{participant.last_name}</td>
              <td>{participant.email}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(participant.id)}
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default ParticipantTable;
