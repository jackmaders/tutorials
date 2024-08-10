import LiveEnvironment from "@/components/LiveEnvironment";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="f-full flex flex-row">
        <LiveEnvironment />
      </section>
    </main>
  );
}
