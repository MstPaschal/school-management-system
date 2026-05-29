import PublicLayout from "../layouts/PublicLayout";

function Contact() {

  return (

    <PublicLayout>

      <section className="py-20">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-10">

            Contact Us

          </h1>

          <div className="bg-white shadow-xl rounded-3xl p-8">

            <div className="space-y-5 text-lg">

              <p>

                📍 Plot 107 Gracious Estate,
                Nkwelle Ezunaka, Anambra State.

              </p>

              <p>

                📞 +234 9060158332

              </p>

              <p>

                ✉️ info@grisfieldschools.com.ng

              </p>

            </div>

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Contact;