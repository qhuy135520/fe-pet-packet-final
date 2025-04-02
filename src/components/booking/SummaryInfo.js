import formatDate from "@/utils/formatDate";

export default function SummaryInfo({
  service,
  inputBooking,
  indexTab,
  setIndexTab,
  handleSubmit,
}) {
  console.log(inputBooking);
  let serviceDetailPrice;
  let serviceAddonPrice;
  function calculatePrice() {
    const percent = (100 - inputBooking.discount) / 100;

    if (inputBooking.serviceAddonId.length == 0) {
      if (
        service.serviceCategory.serviceCategoryId == 1 ||
        service.serviceCategory.serviceCategoryId == 2
      ) {
        return (
          serviceDetailPrice *
          inputBooking.petNum *
          inputBooking.session *
          percent
        );
      } else {
        return serviceDetailPrice * inputBooking.petNum * percent;
      }
    } else {
      if (
        service.serviceCategory.serviceCategoryId == 1 ||
        service.serviceCategory.serviceCategoryId == 2
      ) {
        return (
          (serviceDetailPrice + serviceAddonPrice) *
          inputBooking.petNum *
          inputBooking.session *
          percent
        );
      } else {
        return (
          (serviceDetailPrice + serviceAddonPrice) *
          inputBooking.petNum *
          percent
        );
      }
    }
  }
  function getServiceDetailName() {
    if (inputBooking.serviceDetailId) {
      const filter = service.serviceDetails.filter((item) => {
        return item.serviceDetailId == inputBooking.serviceDetailId;
      });
      return `${filter[0].weightMin}-${filter[0].weightMax}Kg`;
    }
  }
  return (
    <>
      <h5 className="mb-3">Request Sumary</h5>
      <p className="mb-3">
        Confirm or edit the details of your request before sending it out to pet
        lovers
      </p>
      <h5 className="mb-3">Service Select</h5>
      <p className="mb-3">{service.name}</p>
      <h5 className="mb-3">Pet Type</h5>
      <p className="mb-3">{inputBooking.petType == 1 ? "Dog" : "Cat"}</p>
      <h5 className="mb-3">How many pet do you need to?</h5>
      <p className="mb-3">{inputBooking.petNum}</p>
      <h5 className="mb-3">Choose the size of your Pets?</h5>
      <p className="mb-3">{getServiceDetailName()}</p>
      <h5 className="mb-3">Any thing else the groomer will need to know?</h5>
      <p className="mb-3">
        {inputBooking.note == "" || inputBooking.note.length == 0
          ? "(None)"
          : inputBooking.note}
      </p>
      <h5 className="mb-3">Please pick starting date?</h5>
      <p className="mb-3">{formatDate(inputBooking.startDate)}</p>
      <table className="table text-center w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Service Type</th>
            <th>Detail</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {service.serviceDetails.map((serviceDetail) => {
            if (serviceDetail.serviceDetailId == inputBooking.serviceDetailId) {
              serviceDetailPrice = serviceDetail.price;
              return (
                <tr key={serviceDetail.serviceDetailId}>
                  <td>1</td>
                  <td>Price By Size</td>
                  <td>
                    {serviceDetail.weightMin}-{serviceDetail.weightMax}
                    kg
                  </td>
                  <td>{serviceDetail.price.toLocaleString()}</td>
                </tr>
              );
            }
          })}
          {service.serviceAddons.map((serviceAddon) => {
            if (serviceAddon.serviceAddonId == inputBooking.serviceAddonId) {
              serviceAddonPrice = serviceAddon.serviceAddonPrice;
              return (
                <tr key={serviceAddon.serviceAddonId}>
                  <td>2</td>
                  <td>Service Addons</td>
                  <td>{serviceAddon.serviceAddonName}</td>
                  <td>{serviceAddon.serviceAddonPrice.toLocaleString()}</td>
                </tr>
              );
            }
          })}
          <tr>
            <td>3</td>
            <td>Number Of Pet</td>
            <td>{inputBooking.petNum}</td>
            <td>x{inputBooking.petNum}</td>
          </tr>
          {(service.serviceCategory.serviceCategoryId == 1 ||
            service.serviceCategory.serviceCategoryId == 2) && (
            <tr>
              <td>4</td>
              <td>Session(Days)</td>
              <td>{inputBooking.session} Day</td>
              <td>x{inputBooking.session}</td>
            </tr>
          )}
          <tr>
            <td>5</td>
            <td>Discount</td>
            <td>{inputBooking.discount}</td>
            <td>{inputBooking.discount}%</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Total Price: </td>
            <td>{calculatePrice().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="card-footer">
        <button
          className="mr-4"
          id="prevBtn"
          onClick={() => setIndexTab(indexTab - 1)}
        >
          Prev
        </button>
        <button id="nextBtn" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>
    </>
  );
}
