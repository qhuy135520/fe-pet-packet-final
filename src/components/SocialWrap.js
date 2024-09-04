import Image from "next/image";

export default function SocialWrap() {
  return (
    <div className="social-account-wrap">
      <h4 className="mb-4">
        <span>or continue with</span>
      </h4>
      <ul className="list-unstyled social-account d-flex justify-content-between">
        <li>
          <a href="#">
            <Image
              src="/img/auth/icon-google.svg"
              alt="Google logo"
              width={62}
              height={62}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="/img/auth/icon-facebook.svg"
              alt="Facebook logo"
              width={62}
              height={62}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="/img/auth/icon-apple.svg"
              alt="Apple logo"
              width={62}
              height={62}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="/img/auth/icon-twitter.svg"
              alt="Twitter logo"
              width={62}
              height={62}
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
