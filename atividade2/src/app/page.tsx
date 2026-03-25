import TaskSection from "@/components/TaskSection";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="p-6 px-12 h-full flex flex-col lg:px-48">
        <TaskSection />
      </div>
    </main>
  );
}
