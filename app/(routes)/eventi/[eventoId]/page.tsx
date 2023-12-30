import React from "react";
import { auth } from "@clerk/nextjs";
import LeftBar from "@/components/leftbar";
import View from "@/components/view-discoteche";
import getUser from "@/actions/getUser";
import createUser from "@/actions/createUser";
import ViewEventi from "@/components/view-eventi";
import Header from "@/components/header";
import ViewDiscotecaPage from "@/components/ViewDiscotecaPage";
import ViewEventoPage from "@/components/ViewEventoPage";

const EventoPage = async ({
  params,
}: {
  params: { eventoId: string };
}) => {
  const userId = auth().userId;

  const user = await getUser(userId!);
  return (
    <div className="text-white relative h-[screen]">
      <div className="flex h-full">
        <div className="w-full h-full relative">
          <Header user={user} singolo />
          <ViewEventoPage eventoId={params.eventoId!} />
        </div>
      </div>
    </div>
  );
};

export default EventoPage;
