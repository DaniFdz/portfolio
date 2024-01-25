import { useState, type TargetedEvent } from 'preact/compat'
import emailjs from "emailjs-com";
import ContactIcon from "@/components/icons/ContactIcon"
import LoadingIcon from '@/components/icons/LoadingIcon';
import SendIcon from '@/components/icons/SendIcon';

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", color: "" });

    const handleChange = (e: TargetedEvent) => {
        const { target } = e;
        const { name, value } = target as HTMLInputElement;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        setLoading(true);

        if(form.name === "" || form.email === "" || form.message === "" || !RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(form.email)) {
            setLoading(false);
            setMessage({ text: "Please fill in all the fields correctly.", color: "text-red-500" });
            return;
        }

        emailjs
            .send(
              import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: "Daniel",
                    from_email: form.email,
                    message: form.message,
                },
                import.meta.env.VITE_EMAIL_PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    setMessage({ text: "Thank you. I will get back to you as soon as possible.", color: "text-green-500" });

                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });

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
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-black dark:text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-black dark:text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={3}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here"
                className="bg-[#c3c6cf] dark:bg-[#20293d]  py-3 px-5 text-[.9375rem] placeholder:text-secondary text-black dark:text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="flex items-center justify-center  py-3.5 px-14 rounded-full outline-none w-fit gap-1 text-white font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  shadow-sm  shadow-blue-800/80"
              >
                {loading ? <LoadingIcon/> : (<>Send<SendIcon/></>)}
              </button>
            </div>
          </form>

          {message.text && (
            <div className={`${message.color} font-semibold text-center mt-4`}>{message.text}</div>
          )}        
    </div>

}

export default Contact;