// Desc: Hero component that corresponds to CTA Hygraph component
import Main from "./Main";
// RichText is a component that renders Hygraph RichText JSON
import { RichText } from "@graphcms/rich-text-react-renderer";

export default function Hero({ button, title }) {
  return (
    <Main>
      <div className="h-full ml-8 mt-12 px-10 py-16 max-w-2xl">
        <div className="col-span-3 sm:text-center lg:text-left">
          <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">{title}</span>
          </h1>
          <button>
            <a
              href={`#`}
              className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-paws-gold border border-transparent rounded-md hover:bg-paws-gold/80 md:py-4 md:px-10 md:text-lg"
            >
              {button.text}
            </a>
          </button>
          {button?.url ? (
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow"></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Main>
  );
}

export function FullHero(props) {
  // Full width stripe with a large image to the right and title and description and buttons on the left
  return (
    <>
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="self-center sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">{props.title}</span>
            </h2>
            <p className="mt-3 text-lg text-gray-500 sm:mt-4">
              {props.description}
            </p>
            {props.button ? (
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href={props.button.url}
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    {props.button.text}
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {props.image && (
            <div className="self-stretch overflow-hidden lg:col-span-6">
              <img
                className="object-cover object-center w-full h-full"
                src={props.image}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
