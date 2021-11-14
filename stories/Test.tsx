/* eslint-disable @next/next/no-img-element */
import Logo from './assets/logo.svg';

export const Test = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 lg:px-12 lg:py-24 max-w-md mx-auto sm:max-w-xl lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img
              className="h-10"
              src={Logo}
              alt="image"
            />
            <img
              className="mt-6 sm:mt-8 rounded-lg shadow-xl sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
              src="./beach-work.jpg"
              alt="Beach Work"
            />
          
            <h1 className="mt-6 sm:mt-8 text-2xl font-headline tracking-tight font-semibold sm:text-4xl lg:text-3xl xl:text-4xl text-gray-900">
              You can work from anywhere.
              <br className="hidden lg:inline" />
              <span className="text-brand">Take advantage of it.</span>
            </h1>
            <p className="mt-2 sm:mt-4 text-gray-600 sm:text-xl">
              Workcation helps you find work-friendly rentals in beautiful locations so you can enjoy some nice weather even when you`re not on vacation.
            </p>
            <div className="mt-4 sm:mt-6 space-x-1">
              <a className="btn-primary shadow-lg hover:-translate-y-0.5 transform transition" href="#">Book your escape</a>
              <a className="btn-secondary" href="#">Learn more</a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative 2xl:col-span-3">
          <img
            className="absolute inset-0 w-full h-full object-center object-cover"
            src="./beach-work.jpg"
            alt="Beach Work"
          />
        </div>
      </div>
    </>
  )
}
