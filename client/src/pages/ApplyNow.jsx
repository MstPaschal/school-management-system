import PublicLayout from "../layouts/PublicLayout";

function ApplyNow() {

  return (

    <PublicLayout>

      <section className="py-20 bg-gray-50">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-10">

            Apply For Admission

          </h1>

          <form className="bg-white shadow-xl rounded-3xl p-8 space-y-6">

            <input
              type="text"
              placeholder="Student Full Name"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Parent Name"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-xl px-4 py-4"
            />

            <select
              className="w-full border rounded-xl px-4 py-4"
            >

              <option>
                Select Class
              </option>

              <option>
                Nursery
              </option>

              <option>
                Primary
              </option>

              <option>
                Secondary
              </option>

            </select>

            <button
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl"
            >

              Submit Application

            </button>

          </form>

        </div>

      </section>

    </PublicLayout>

  );

}

export default ApplyNow;