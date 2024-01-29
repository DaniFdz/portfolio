import { useState, type TargetedEvent } from 'preact/compat'
import emailjs from "@emailjs/browser";
import ContactIcon from "@/components/icons/ContactIcon"
import LoadingIcon from '@/components/icons/LoadingIcon';
import SendIcon from '@/components/icons/SendIcon';

const Contact = () => {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "" });

  const handleChange = (e: TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (form.from_name === "") {
      setMessage({ text: "Please enter your name.", color: "text-red-500" });
      return;
    }

    if (form.from_email === "") {
      setMessage({ text: "Please enter your email address.", color: "text-red-500" });
      return;
    }

    if (form.message === "") {
      setMessage({ text: "Please enter your message.", color: "text-red-500" });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.PUBLIC_VITE_EMAIL_SERVICE_ID??"",
        import.meta.env.PUBLIC_VITE_EMAIL_TEMPLATE_ID??"",
        form,
        import.meta.env.PUBLIC_VITE_EMAIL_PUBLIC_KEY??""
      )
      .then(
        () => {
          setLoading(false);
          setMessage({ text: "Thank you. I will get back to you as soon as possible.", color: "text-green-500" });

          // Clear the success message after 5 seconds
          setTimeout(() => {
            setMessage({ text: "", color: "" });
          }, 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setMessage({ text: "Ahh, something went wrong. Please try again.", color: "text-red-500" });
        }
      );
  };

  return <div
    class="flex flex-col items-left px-4 py-3 rounded-lg bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,#f3f6ff_1px)] dark:bg-[radial-gradient(#ffffff20_1px,#00091d_1px)] bg-[size:30px_30px]"
  >
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
    >
    </div>
    <h2 class="text-2xl flex flex-row gap-1.5 items-center">
      <ContactIcon /> Contact
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <label className="flex flex-col">
        <span className="text-black dark:text-white font-medium mb-4">Your Name</span>
        <input
          type="text"
          name="from_name"
          placeholder="Enter your name"
          onChange={handleChange}
          className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-black dark:text-white font-medium mb-4">Your email</span>
        <input
          type="email"
          name="from_email"
          placeholder="Enter your email address"
          onChange={handleChange}
          className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-black dark:text-white font-medium mb-4">Your Message</span>
        <textarea
          rows={3}
          name="message"
          placeholder="Type your message here"
          onChange={handleChange}
          className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
        />
      </label>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="flex items-center justify-center  py-3.5 px-14 rounded-full outline-none w-fit gap-1 text-white font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  shadow-sm  shadow-blue-800/80"
        >
          {loading ? <LoadingIcon /> : (<>Send<SendIcon /></>)}
        </button>
      </div>
    </form>

    {message.text && (
      <div className={`${message.color} font-semibold text-center mt-4`}>{message.text}</div>
    )}
  </div>

}

export default Contact;