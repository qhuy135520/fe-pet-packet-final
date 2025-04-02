export default function Amentities({ service }) {
  return (
    <div className="listing__details__amenities">
      <h4>Price by additional service</h4>
      <table className="table text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {service.serviceAddons?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.serviceAddonName}</td>
                <td>{item.serviceAddonPrice.toLocaleString()}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
