export default function StarRating({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;
  const maxStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <>
        <span key={i} className="icon_star"></span> &nbsp;
      </>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <>
        <span key="half" className="icon_star-half_alt"></span>&nbsp;
      </>
    );
  }

  const emptyStars = maxStars - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <>
        <span key={`empty-${i}`} className="icon_star-empty"></span>&nbsp;
      </>
    );
  }

  return <div key={"star"}>{stars}</div>;
}
