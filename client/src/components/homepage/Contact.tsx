import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import { API } from "../../lib/API";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const inputStyle =
  "border-[#dbdee3] text-blacky bg-[#f4f5f5] placeholder-[#afb6c3] focus:border-primary rounded-xs";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContactFields>();

  const onSubmit: SubmitHandler<ContactFields> = async (data) => {
    try {
      const contactData: ContactFields = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      };
      console.log(contactData);
      await API.post("/contact", contactData);
      console.log("Form submitted successfully");
    } catch (err) {
      console.error("Form submission error", err);
      setError("name", { message: "An error occurred" });
    }
  };

  return (
    <section className="contact container section mt-[40px]!">
      <div className="sec-container">
        <div className="sec-intro">
          <h2 className="sec-title font-bold" data-aos="fade-up">
            Contact Us
          </h2>
          <p className="leading-8" data-aos="fade-up" data-aos-duration="2000">
            For further questions, please contact us using our contact form
          </p>
        </div>

        <div className="contact-card">
          <div className="left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("name", { required: "Name is required" })}
                label="Name"
                type="text"
                placeholder="John Doe"
                className="mb-4"
                inputClassName={inputStyle}
                errorMessage={errors.name?.message}
              />
              <Input
                {...register("email", { required: "Email is required" })}
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                className="mb-4"
                inputClassName={inputStyle}
                errorMessage={errors.email?.message}
              />
              <Input
                {...register("phone", { required: "Phone is required" })}
                label="Phone"
                type="tel"
                placeholder="123-456-7890"
                className="mb-4"
                inputClassName={inputStyle}
                errorMessage={errors.phone?.message}
              />
              <Input
                {...register("subject", { required: "Subject is required" })}
                label="Subject"
                type="text"
                placeholder="Subject"
                className="mb-4"
                inputClassName={inputStyle}
                errorMessage={errors.subject?.message}
              />
              <Input
                {...register("message")}
                label="Message"
                type="textarea"
                required={false}
                placeholder="Your message"
                className="mb-4"
                inputClassName={inputStyle}
                errorMessage={errors.message?.message}
              />
              <button
                className="flex justify-center items-center px-2.5 py-3 rounded-[12px] bg-primary"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="right">
            <img src="/images/contact.png" alt="Contact Image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
