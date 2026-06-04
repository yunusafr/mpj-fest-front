import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ClaimRegisterForm from "../components/ClaimRegisterForm";

import NiamSearchForm
from "../components/NiamSearchForm";

import MemberCard
from "../components/MemberCard";

import NotFoundMember
from "../components/NotFoundMember";

import { useCheckNiam }
from "../hooks/useCheckNiam";

export default function ClaimAccountPage() {

  const [member, setMember] =
    useState(null);

  const [notFound, setNotFound] =
    useState(false);

  const checkNiam =
    useCheckNiam();

  const handleSearch =
    async (values) => {

      setMember(null);
      setNotFound(false);

      try {

        const result =
          await checkNiam
            .mutateAsync(
              values.niam
            );

        setMember(
          result.data
        );

      } catch (error) {

        if (
          error.response
            ?.status ===
          404
        ) {
          setNotFound(true);
        }
      }
    };

  return (
    <section
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-green-50
      via-white
      to-yellow-50
      px-4
    "
    >

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        w-full
        max-w-xl
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-6
          "
        >
          Klaim Akun
        </h1>
            <div className="mb-6 mt-5 flex justify-center">
  <Link
    to="/"
    className="
      inline-flex
      items-center
      gap-2

      text-sm
      font-medium

      text-slate-500

      transition-colors

      hover:text-green-600
    "
  >
    <ArrowLeft size={16} />
    Kembali ke Beranda
  </Link>
</div>

        <NiamSearchForm
          onSearch={
            handleSearch
          }
          loading={
            checkNiam.isPending
          }
        />

       {member && (
  <>
    <MemberCard data={member} />

    <ClaimRegisterForm
      member={member}
    />
  </>
)}
        {notFound && (
          <NotFoundMember />
        )}

      </div>

    </section>
  );
}