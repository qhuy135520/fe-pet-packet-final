import { DatePicker } from "rsuite";
import moment from "moment";
import { useRef } from "react";
import { toast } from "react-toastify";
import { sendRequest } from "@/utils/api";

export default function ServiceDetailInfo({
  handleChange,
  service,
  inputBooking,
  setInputBooking,
  params,
  indexTab,
  setIndexTab,
  setAvailableBooking,
  setLoading,
  petType,
}) {
  const checkServiceAddonRef = useRef(null);
  const checkDateRef = useRef(null);
  const checkSessionRef = useRef(null);
  const checkPetType = useRef(null);

  const disablePastDates = (date) => {
    const today = new Date();

    return date <= today;
  };

  const disableHours = (hour) => {
    return hour < 8 || hour > 19;
  };

  const handleDateChange = (value) => {
    const formInput = { ...inputBooking };

    formInput["startDate"] = moment(value).format("YYYY-MM-DDTHH:mm:ss");
    setInputBooking(formInput);
  };

  async function handleNext(e) {
    e.preventDefault();
    // if (inputBooking.serviceAddonId.length == 0) {
    //   checkServiceAddonRef.current.setCustomValidity(
    //     "Service Addon is required!"
    //   );
    //   checkServiceAddonRef.current.reportValidity();
    // } else
    if (inputBooking.petType.length == 0 || inputBooking.petType == "") {
      {
        checkPetType.current.setCustomValidity("Pet Type is required");
        checkPetType.current.reportValidity();
      }
    } else if (inputBooking.startDate.length == 0) {
      toast.error(
        <div>
          <strong>Start Date is required!</strong>
        </div>
      );
    } else if (
      (inputBooking.session.length == 0 &&
        (service.serviceCategory.serviceCategoryId == 1 ||
          service.serviceCategory.serviceCategoryId == 2)) ||
      inputBooking.session <= 0 ||
      inputBooking.session > 7
    ) {
      checkSessionRef.current.setCustomValidity("Session is required");
      checkSessionRef.current.reportValidity();
    } else {
      try {
        const resBooking = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/available-booking/${service.serviceId}`,
          body: inputBooking.startDate,
          method: `POST`,
        });
        setAvailableBooking(resBooking.data);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setIndexTab(indexTab + 1);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="ml-3 col-md-6">
          <h5>What type of Service Detail requireds?</h5>

          <select
            ref={checkServiceAddonRef}
            className="form-control mt-3 mb-3"
            value={inputBooking.serviceAddonId}
            name="serviceAddonId"
            onChange={(e) => handleChange(e)}
          >
            <option value={""}>Choose Service Addons</option>
            {service.serviceAddons.map((serviceAddon) => {
              return (
                <option
                  value={serviceAddon.serviceAddonId}
                  key={serviceAddon.serviceAddonId}
                >
                  {serviceAddon.serviceAddonName} -{" "}
                  {serviceAddon.serviceAddonPrice.toLocaleString()} vnd
                </option>
              );
            })}
          </select>
          <h5>What type of Pet requireds?</h5>
          <select
            className="form-control mt-3 mb-3"
            name="petType"
            value={inputBooking.petType}
            onChange={(e) => handleChange(e)}
            ref={checkPetType}
          >
            <option value={""}>Select Pet Type</option>
            {petType.map((type) => {
              return (
                <option key={type.petTypeId} value={type.petTypeId}>
                  {type.petTypeName}
                </option>
              );
            })}
          </select>
          <h5 className="mb-3">Please pick starting date of the service</h5>
          <DatePicker
            ref={checkDateRef}
            shouldDisableHour={disableHours}
            shouldDisableDate={disablePastDates}
            className="mb-3"
            locale={"UTC"}
            type="datetime-local"
            format="yyyy/MM/dd hh:mm aa"
            size="lg"
            onChange={(e) => handleDateChange(e)}
            name="startDate"
            value={new Date(inputBooking.startDate)}
            style={{ width: "100%" }}
          />
          {service.serviceCategory.serviceCategoryId != 3 &&
            service.serviceCategory.serviceCategoryId != 4 && (
              <>
                <h5 className="mb-3">How many session do you need?</h5>
                <input
                  className="form-control mb-3"
                  type="number"
                  name="session"
                  value={inputBooking.session}
                  ref={checkSessionRef}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
        </div>
      </div>
      <div className="card-footer">
        <button id="nextBtn" onClick={(e) => handleNext(e)}>
          Next
        </button>
      </div>
    </>
  );
}
