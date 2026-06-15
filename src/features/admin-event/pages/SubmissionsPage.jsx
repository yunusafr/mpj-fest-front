import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import { useSubmissions }
from "../hooks/useSubmissions";

import { usePublicFestivals }
from "@/features/payments/hooks/usePublicFestivals";

export default function SubmissionsPage() {

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const festivalId =
    searchParams.get(
      "festival_id"
    );

  const {
    data: festivalData,
  } = usePublicFestivals();

  const festivals =
    festivalData?.data || [];

  const publishedFestival =
    festivals.find(
      (festival) =>
        festival.status ===
        "published"
    );

  const initialized =
    useRef(false);

  useEffect(() => {

    if (
      initialized.current
    ) {

      return;

    }

    if (
      !festivalId &&
      publishedFestival
    ) {

      initialized.current =
        true;

      setSearchParams({

        festival_id:
          String(
            publishedFestival.id
          )

      });

    }

  }, [

    festivalId,

    publishedFestival,

    setSearchParams,

  ]);

const activeFestivalId = initialized.current
  ? festivalId
  : (
      festivalId ||
      publishedFestival?.id?.toString() ||
      ""
    );

const selectedFestival =
  festivalId ??
  (
    !initialized.current
      ? publishedFestival
          ?.id
          ?.toString()
      : "all"
  );

  const {

    data,

    isLoading,

  } = useSubmissions(

    activeFestivalId

  );

  const submissions =

    data?.data || [];

  const getStatusStyle =
    (status) => {

      switch (status) {

        case "verified":

          return `
            bg-emerald-50
            text-emerald-700
            ring-emerald-200
          `;

        case "rejected":

          return `
            bg-red-50
            text-red-700
            ring-red-200
          `;

        default:

          return `
            bg-amber-50
            text-amber-700
            ring-amber-200
          `;
      }

    };

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex items-start justify-between">

          <div>

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
                ring-1
                ring-emerald-200
              "
            >

              <Sparkles size={12} />

              Competition Hub

            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">

              Submission Karya

            </h1>

            <p className="mt-2 text-slate-500">

              Kelola dan pantau seluruh karya peserta yang masuk

            </p>

          </div>

        </div>

      </div>

      {/* FILTER */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="flex justify-end">

          <select

            value={selectedFestival}

 onChange={(e) => {

  const value =
    e.target.value;

  if (
    value === "all"
  ) {

    initialized.current =
      true;

    setSearchParams({});

  } else {

    initialized.current =
      true;

    setSearchParams({

      festival_id:
        value

    });

  }

}}

            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              outline-none

              focus:border-emerald-500
            "

          >

            <option value="all">

              Semua Festival

            </option>

            {festivals.map(
              (festival) => (

                <option

                  key={festival.id}

                  value={String(
                    festival.id
                  )}

                >

                  {festival.nama}

                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* EMPTY */}

      {submissions.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

          <FileText
            size={44}
            className="
              mx-auto
              text-slate-300
            "
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">

            Belum ada submission

          </h3>

          <p className="mt-1 text-slate-500">

            Karya peserta akan muncul secara otomatis di sini

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {submissions.map(
            (submission) => (

              <div

                key={
                  submission.id
                }

                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5

                  transition-all

                  hover:shadow-md
                  hover:-translate-y-0.5
                "

              >

                <div className="flex items-center justify-between gap-4">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <p className="font-semibold text-slate-900">

                        {
                          submission?.judul_karya
                        }

                      </p>

                      <span

                        className={`

                          text-xs
                          px-2
                          py-0.5

                          rounded-full
                          ring-1

                          ${getStatusStyle(
                            submission?.status
                          )}

                        `}

                      >

                        {
                          submission?.status
                        }

                      </span>

                    </div>

                    <p className="text-sm text-slate-500">

                      {
                        submission
                        ?.registration
                        ?.user
                        ?.nama
                      }

                      {" • "}

                      {
                        submission
                        ?.registration
                        ?.event
                        ?.nama
                      }

                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="hidden sm:block text-right">

                      <p className="text-xs text-slate-400">

                        Event

                      </p>

                      <p className="text-sm font-medium text-slate-700">

                        {
                          submission
                          ?.registration
                          ?.event
                          ?.nama
                        }

                      </p>

                    </div>

                    <Link

                        to={

    activeFestivalId

      ? `${submission.id}?festival_id=${activeFestivalId}`

      : `${submission.id}`

  }

                      className="
                        inline-flex
                        items-center
                        gap-2

                        rounded-xl

                        bg-gradient-to-r
                        from-emerald-500
                        to-emerald-600

                        px-4
                        py-2

                        text-sm
                        font-semibold
                        text-white

                        transition-all

                        hover:from-emerald-600
                        hover:to-emerald-700

                        hover:shadow-md

                        active:scale-[0.98]
                      "

                    >

                      Detail

                      <ArrowRight
                        size={16}
                      />

                    </Link>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}