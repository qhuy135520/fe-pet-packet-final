import "@/styles/booking/pet-listing.css";
import Image from "next/image";
export default function PetListing({ pets, booking, setBooking }) {
  const handlePetChange = (event) => {
    const { value, checked } = event.target;
    const numericValue = Number(value);
    if (checked) {
      setBooking((prevState) => ({
        ...prevState,
        pets: [...prevState.pets, numericValue],
      }));
    } else {
      setBooking((prevState) => ({
        ...prevState,
        pets: prevState.pets.filter((petId) => petId !== numericValue),
      }));
    }
  };

  return (
    <>
      <div className="container-pets row">
        {pets.map((pet) => {
          return (
            <div key={pet.petId} className="col-md-4 pl-0">
              <label className="card-checkbox-pets">
                <input
                  type="checkbox"
                  name="pets"
                  value={pet.petId}
                  id="checkbox-pets"
                  checked={booking.pets.includes(pet.petId)}
                  onChange={(e) => handlePetChange(e)}
                />
                <div className="card-checkbox-content">
                  {pet.petPicture === null || pet.petPicture === "" ? (
                    <img
                      src="https://cdn.myportfolio.com/c728a553-9706-473c-adca-fa2ea3652db5/a124d74e-ff6c-4949-aa4f-ea4d43b71224_rw_1200.jpg?h=2a9066a9cacc857be72862cc4e3beb64"
                      alt=""
                    />
                  ) : (
                    <img src={pet.petPicture} alt="" />
                  )}
                  <div className="content-pets">
                    <h4>{`${pet.petName} - ${pet.petWeight}kg`}</h4>
                    <p>{`${pet.petBirthDate} - ${pet.petGender}`}</p>
                    <p></p>
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
