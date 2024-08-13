'use client';
import SectionTitle from '../components/Common/SectionTitle';

const BuildSubmissionPage = () => {

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 top-20">
      <div className="container">
        <SectionTitle
          title="This page is not ready yet"
          paragraph="If you would like to submit a build to be featured on here please email an image and title of the build to: "
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-44 left-0 right-0 z-[-1]">
        <img src="/images/shape.svg" alt="shape" className="w-full" />
      </div>
    </section>
  );
};

export default BuildSubmissionPage;
