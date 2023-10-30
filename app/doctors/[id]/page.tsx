"use client";

import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDoctorQuery } from "@/redux/api/doctorApi";
import Image from "next/image";
import { doctor_avatar } from "@/assets/images";
import { Phone, AtSign, MapPin, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DoctorDetailsProps {
  params: { id: string };
}

const DoctorDetails: FC<DoctorDetailsProps> = ({ params }) => {
  const { data: doctor, isLoading: doctorIsLoading } = useGetDoctorQuery(
    params?.id
  );

  if (doctorIsLoading) return <Skeleton />;

  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div className="lg:col-span-2 md:col-span-2">
        <div className="rounded-lg flex flex-col md:flex-row border-2 border-green-500">
          <Image
            src={doctor?.data?.image ? doctor?.data?.image : doctor_avatar}
            alt="doctor"
            width={300}
            height={300}
            className="rounded-l-lg"
          />
          <div className="p-3">
            <h2 className="text-2xl font-semibold text-[#00ACB1] mb-1">
              {doctor?.data?.name}
            </h2>
            <strong className="dark:text-gray-400 text-gray-500">
              {doctor?.data?.speciality.slice(0, 1)}
              <span className="lowercase">
                {doctor?.data?.speciality.slice(1)}
              </span>
            </strong>
            <p className="mt-2 text-gray-400">{doctor?.data?.experiences}</p>
            <div className="flex flex-row items-center justify-start mt-2">
              <span className="flex flex-row items-center justify-start gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i: number) => (
                    <Star key={i} fill="#FCB71B" color="#FCB71B" size={20} />
                  ))}
              </span>
              <span className="text-gray-400 ml-4">(4/5)</span>
            </div>
            <div className="flex flex-row items-center justify-start mt-8">
              <Phone size={20} color="#00ACB1" />
              &nbsp;
              <span className="text-gray-400">
                +88&nbsp;{doctor?.data?.contactNo}
              </span>
            </div>
            <div className="flex flex-row items-center justify-start my-3">
              <AtSign size={20} color="#00ACB1" />
              &nbsp;<span className="text-gray-400">{doctor?.data?.email}</span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <MapPin size={20} color="#00ACB1" />
              &nbsp;
              <span className="text-gray-400">
                {doctor?.data?.branch.slice(0, 1)}
                <span className="lowercase">
                  {doctor?.data?.branch.slice(1)}
                </span>
              </span>
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="about"
          className="w-full border-2 border-green-600 rounded-lg mt-4"
        >
          <TabsList className="w-full py-6">
            <TabsTrigger
              value="about"
              className="font-bold text-md border-2 border-gray-400 rounded-none w-full"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="location_and_contact"
              className="font-bold text-md border-2 border-gray-400 border-l-0 rounded-none w-full"
            >
              Location & Contact
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="font-bold text-md border-2 border-gray-400 border-l-0 rounded-none w-full"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="about">About</TabsContent>
            <TabsContent value="location_and_contact">
              Location and Contact
            </TabsContent>
            <TabsContent value="reviews">Reviews</TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="lg:col-span-1 border-2 border-white md:col-span-2"></div>
    </section>
  );
};

export default DoctorDetails;
