import React from "react";

import { getEvent } from "@/services/event";

type PageProps = {
  params: { id: string };
};

const EventDetail: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  const {
    title,
    description,
    coverImage,
    startDate,
    endDate,
    recurrence,
    User,
  } = await getEvent(id);

  return (
    <div className="mx-auto lg:py-6 md:py-12 md:px-6 py-9 px-4 ">
      <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
        {/* <!-- Description Div --> */}

        <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
            {title}
          </h2>

          <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
            {description}
          </p>
          <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
            Recurrence: {recurrence}
          </p>

          <div className="lg:mt-11 mt-10">
            <div className="flex flex-row justify-between">
              <p className=" font-medium text-base leading-4 text-gray-600">
                {new Date(startDate).toDateString()}
              </p>
              <p>{new Date(endDate).toDateString()}</p>
            </div>
            <hr className=" bg-gray-200 w-full my-2" />
          </div>

          <p>Event Creator/Owner: {User.name}</p>
        </div>

        {/* <!-- Preview Images Div For larger Screen--> */}

        <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <div className="w-full2 bg-gray-100 flex justify-center items-center">
            <img src={JSON.parse(coverImage)} alt="Wooden Chair Previw" />
          </div>
          {/* <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
            <div className="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/0jX1zmR/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1-1.png"
                alt="Wooden chair - preview 1"
              />
            </div>
            <div className="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/7zv1N5Q/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-2.png"
                alt="Wooden chair - preview 2"
              />
            </div>
            <div className="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/0jX1zmR/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1-1.png"
                alt="Wooden chair- preview 3"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
