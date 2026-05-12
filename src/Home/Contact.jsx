import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const Contact = () => {
  const myAxios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await myAxios.post("/contact-messages", formData);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell min-h">
      <div className="brand-section overflow-hidden">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="bg-slate-950 p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase text-pink-300">Contact</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">Reach the RedLove support team.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">Use this form for volunteer coordination, urgent support, partnership requests, or platform feedback.</p>
            <div className="mt-8 space-y-3 text-sm font-semibold text-slate-200">
              <p>Chittagong, Bangladesh</p>
              <p>+880 1572223906</p>
              <p>Admin@RedLoveUser.com</p>
            </div>
          </aside>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 p-6 sm:p-8 lg:p-10">
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" className="brand-input" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="mt-1 text-sm font-semibold text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="brand-input" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} />
              {errors.email && <p className="mt-1 text-sm font-semibold text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <input id="subject" className="brand-input" {...register("subject", { required: "Subject is required" })} />
              {errors.subject && <p className="mt-1 text-sm font-semibold text-red-600">{errors.subject.message}</p>}
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} className="brand-input resize-none" {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })} />
              {errors.message && <p className="mt-1 text-sm font-semibold text-red-600">{errors.message.message}</p>}
            </div>
            <button className="action-button gap-2" disabled={loading} type="submit">
              {loading ? <>Sending <ImSpinner3 className="animate-spin" /></> : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
