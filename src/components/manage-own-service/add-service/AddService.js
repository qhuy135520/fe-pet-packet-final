import "@/styles/manage-own-service/add-service.css";
import { sendRequest } from "@/utils/api";
import { uploadImage } from "@/utils/upload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Preloder from "../../Preloder";
import FinalConfirm from "./FinalConfirm";
import ServiceAddons from "./ServiceAddons";
import ServiceInformation from "./ServiceInformation";
import UpdatePrice from "./UpdatePrice";
import UploadImage from "./UploadImage";

export default function AddService({ serviceCategoryId, setIndex }) {
  const [indexTab, setIndexTab] = useState(1);

  const [image, setImage] = useState(null);

  const { data: session, status } = useSession();

  const router = useRouter();

  const [newService, setNewService] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
    overview: "",
    pictureTxt: "",
    serviceCategoryId: serviceCategoryId,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (session) {
        const pictureUrl = await uploadImage(image);
        const formInput = await { ...newService };
        formInput["pictureTxt"] = await pictureUrl;

        const payload = {
          service: formInput,
          serviceDetails: newServiceDetail,
          serviceAddons: newServiceAddons,
        };

        const res = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${session.user.userId}`,
          body: payload,
          method: "POST",
        });

        if (res.statusCode === 200) {
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [newServiceDetail, setNewServiceDetail] = useState([]);

  const [newServiceAddons, setNewServiceAddons] = useState([]);

  const [petType, setPetType] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resCities = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
      });
      setCities(resCities.data);

      const resPetType = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
      });
      setPetType(resPetType.data);

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <Preloder />;
  }
  function getCategoryName() {
    switch (serviceCategoryId) {
      case 1:
        return "Pet Boarding";

      case 2:
        return "Pet Sitting";
      case 3:
        return "Pet Grooming";
      case 4:
        return "Pet Walking";
    }
  }

  return (
    <>
      <section className="multi_step_form">
        <form id="msform">
          <div className="tittle">
            <h2>Add new Service ({getCategoryName()})</h2>
            <p>
              In order to use this service, you have to complete this
              verification process
            </p>
          </div>
          <ul id="progressbar">
            <li className={`${indexTab >= 1 ? "active" : ""}`}>Input info </li>
            <li className={`${indexTab >= 2 ? "active" : ""}`}>
              Upload Images
            </li>
            <li className={`${indexTab >= 3 ? "active" : ""}`}>Update price</li>
            <li className={`${indexTab >= 4 ? "active" : ""}`}>
              Service Addon
            </li>
            <li className={`${indexTab >= 5 ? "active" : ""}`}>
              Final Confirm
            </li>
          </ul>
          {indexTab === 1 && (
            <ServiceInformation
              cities={cities}
              newService={newService}
              setNewService={setNewService}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
              setIndex={setIndex}
            />
          )}
          {indexTab === 2 && (
            <UploadImage
              image={image}
              setImage={setImage}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
            />
          )}
          {indexTab === 3 && (
            <UpdatePrice
              petType={petType}
              newServiceDetail={newServiceDetail}
              setNewServiceDetail={setNewServiceDetail}
              serviceCategoryId={serviceCategoryId}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
            />
          )}

          {indexTab === 4 && (
            <ServiceAddons
              newServiceAddons={newServiceAddons}
              setNewServiceAddons={setNewServiceAddons}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
            />
          )}

          {indexTab === 5 && (
            <FinalConfirm
              newService={newService}
              newServiceDetail={newServiceDetail}
              newServiceAddons={newServiceAddons}
              setIndexTab={setIndexTab}
              indexTab={indexTab}
              serviceCategoryId={serviceCategoryId}
              image={image}
            />
          )}
          {/* {indexTab > 1 && (
            <button
              type="button"
              className="action-button previous_button"
              onClick={() => setIndexTab(indexTab - 1)}
            >
              Back
            </button>
          )} */}
          {/* {indexTab < 5 && (
            <button
              type="button"
              className="next action-button"
              onClick={() => setIndexTab(indexTab + 1)}
            >
              Next
            </button>
          )} */}
          {indexTab === 5 && (
            <button
              type="button"
              className="next action-button"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          )}
        </form>
      </section>
    </>
  );
}
