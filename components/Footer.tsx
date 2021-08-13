import moment from "moment";
import { NextPage } from "next";

interface Props {}

const Footer: NextPage<Props> = () => {
  const year: number = moment().get("year");

  return (
    <>
      <footer
        className={`flex lg:flex-row justify-between text-center text-xs lg:p-2 p-3 md:p-2 sm:p-0 mt-6 relative bottom-0 border-t border-gray-300 bg-gray-50 w-full text-gray-400`}
      >
        <ul className="flex lg:flex-row gap-4">
          <li>
            <a href="/terms">Terms of Use</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
        <p>&copy; {year} Roomify</p>
      </footer>
    </>
  );
};

export default Footer;
