import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import {
  MdLocationPin,
  MdOutlineEmail,
  MdOutlineWhatsapp,
} from "react-icons/md";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ContactProps } from "../../lib/types";
import useContactMutation from "../../hooks/mutations/useContactMutation";

const contactsData = [
  {
    title: "Email",
    description: "stayease@gmail.com",
    icon: MdOutlineEmail,
    link: "mailto:stayease@gmail.com",
  },
  {
    title: "Phone Number",
    description: "+62 822-9222-4111",
    icon: MdOutlineWhatsapp,
    link: "https://wa.me/6282292224111",
  },
  {
    title: "Location",
    description: "Jln. Ki Hajar Dewantara, No.21",
    icon: MdLocationPin,
    link: "https://www.google.com/maps/search/?api=1&query=Jln.+Ki+Hajar+Dewantara,+No.21",
  },
];

const socialMediaData = [
  {
    icon: FaFacebook,
    link: "https://www.facebook.com",
  },
  {
    icon: RiInstagramFill,
    link: "https://www.instagram.com",
  },
  {
    icon: FaTwitter,
    link: "https://www.twitter.com",
  },
];

const inputStyle =
  "border-[#dbdee3] px-4 py-4 text-blacky bg-[#f4f5f5] placeholder-[#afb6c3] focus:border-primary rounded-xs";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ContactProps>();
  const { contactMutation } = useContactMutation(setError);

  const onSubmit: SubmitHandler<ContactProps> = (data) => {
    contactMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="contact container section mb-6! mt-[40px]">
      <div className="title">
        <div className="sec-intro">
          <h2 className="sec-title font-bold" data-aos="fade-up">
            Contact Us
          </h2>
          <p className="leading-8" data-aos="fade-up" data-aos-duration="1000">
            For further questions, please contact us using our contact form
          </p>
        </div>
      </div>

      <div
        className="contact-card gap-2 rounded-3xl bg-white flex flex-col-reverse md:flex-row md:space-x-8 p-10 shadow-[0_1px_20px_rgba(0,0,0,0.1)]"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="left w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: "Name is required" })}
              label="Name"
              type="text"
              placeholder="John Doe"
              className="mb-5"
              inputClassName={inputStyle}
              errorMessage={errors.name?.message}
            />
            <Input
              {...register("email", { required: "Email is required" })}
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              className="mb-5"
              inputClassName={inputStyle}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("phone", { required: "Phone is required" })}
              label="Phone"
              type="tel"
              placeholder="123-456-7890"
              className="mb-5"
              inputClassName={inputStyle}
              errorMessage={errors.phone?.message}
            />
            <Input
              {...register("subject", { required: "Subject is required" })}
              label="Subject"
              type="text"
              placeholder="Subject"
              className="mb-5"
              inputClassName={inputStyle}
              errorMessage={errors.subject?.message}
            />
            <TextArea
              {...register("message")}
              label="Message"
              required={false}
              placeholder="Your message"
              className="mb-5"
              inputClassName={inputStyle}
              errorMessage={errors.message?.message}
            />
            <button
              className="flex cursor-pointer text-white font-semibold justify-center w-full items-center px-2.5 py-3 rounded-[12px] bg-[#213555] hover:bg-[#1a2a44] transition-colors duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        <div
          className="right w-full pt-10 p-6 h-full! md:w-1/2 text-white rounded-xl"
          style={{
            backgroundImage: "url('/images/contact.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "full",
          }}
        >
          <div className="title max-w-[60%]">
            <h3 className="font-bold text-[32px] mb-1">Contact Information</h3>
            <p className="text-[16px] leading-6.5 mb-[40px]">
              Leave your email and we will get back to you within 24 hours
            </p>
          </div>

          <div className="contact-informations max-w-[60%]">
            {contactsData.map((info) => (
              <ContactInformation
                key={info.title}
                title={info.title}
                description={info.description}
                icon={info.icon}
                link={info.link}
              />
            ))}
          </div>

          <div className="social-medias flex gap-4 mt-[60px] mb-10">
            {socialMediaData.map((social) => (
              <SocialMedia
                key={social.link}
                icon={social.icon}
                link={social.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInformation({
  title,
  description,
  icon: Icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}) {
  return (
    <div
      className="info p-3 rounded-md transition-colors cursor-pointer duration-300 mt-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0)")
      }
      onClick={() => window.open(link, "_blank")}
    >
      <h6 className="text-[18px] font-semibold">{title}</h6>
      <span className="flex gap-2 text-[17px]">
        <Icon className="w-[24px] h-[24px]" /> {description}
      </span>
    </div>
  );
}

function SocialMedia({
  icon: Icon,
  link,
}: {
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}) {
  return (
    <div
      className="rounded-full bg-[#FFC26F] cursor-pointer p-2 transition-colors duration-300 hover:bg-[#FFA500]"
      onClick={() => window.open(link, "_blank")}
    >
      <Icon className="w-[24px] h-[24px] text-[#]" />
    </div>
  );
}

export default Contact;
