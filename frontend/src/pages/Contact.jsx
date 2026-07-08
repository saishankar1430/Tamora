function Contact() {
  return (
    <section className="py-24">

      <div className="max-w-3xl mx-auto px-8">

        <h1 className="text-5xl font-bold text-center mb-12">
          Contact Us
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-xl px-5 py-4"
          />

          <textarea
            rows="6"
            placeholder="Message"
            className="w-full border rounded-xl px-5 py-4"
          />

          <button
            className="bg-black text-white px-10 py-4 rounded-full"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;