import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Legal Information
        </h1>
        <p className="mb-4 text-gray-700">
          Pluggn is a social commerce platform and a brand of{" "}
          <span className="font-semibold">PLUGGN INNOVATIONS</span>
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
         
          <p>
            <strong>Business Registration Number (RC/BN):</strong> 8787052
          </p>
          <p>
            <strong>Registration Type:</strong> Software development
          </p>
        </div>

        <p className="mb-4 text-gray-700">
          Below is a copy of our CAC registration certificate for public
          verification:
        </p>

        <Link
          href="/certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Certificate
        </Link>
      </div>
    </main>
  );
}
