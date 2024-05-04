import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// console.log(import.meta.env.VITE_APP_BASEURL);
// const profileId = "6634d4f75534ca360eeae8a3";

function ProfileCard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { profileId } = useParams();

  const getProfieData = async () => {
    try {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_APP_SERVER_BASEURL
      }/user/${profileId}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.success) {
        toast.success("User found successfully");
        setProfile(response.data.user);
      } else {
        toast.error("No user found");
        navigate("/");
      }
    } catch (error) {
      toast.error("Internal error occured");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfieData();
  }, []);

  const handleSubmit = (param) => {
    if (param === "Edit") {
      navigate(`/profile/update/${profileId}`);
    }
  };

  if (loading) {
    <p>LOADING...</p>;
  }
  return (
    <div className="h-full w-full bg-slate-900">
      <section className="pt-16 bg-gray-800 pb-16">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="/assets/authlayoutimg.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        22
                      </span>
                      <span className="text-sm text-white">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        10
                      </span>
                      <span className="text-sm text-white">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        89
                      </span>
                      <span className="text-sm text-white">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <div className="flex justify-center gap-3">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-white">
                    Jenna Stones
                  </h3>

                  <CiEdit
                    className="text-white h-6 w-6 mt-1 cursor-pointer"
                    onClick={() => {
                      handleSubmit("Edit");
                    }}
                  />
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-white font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-white"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-white mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-white"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-white">
                  <i className="fas fa-university mr-2 text-lg text-white"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <QRCode
                      value={`${
                        import.meta.env.VITE_APP_BASEURL
                      }/profile/${profileId}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;