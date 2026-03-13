import TaskSection from "@/components/TaskSection";

export default function Home() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="flex flex-col items-center justify-center border-r"> 
        <h1>Projeto Agenda de Tarefas</h1>
        <p>TIMER (PLACEHOLDER)</p>
      </div>
      <div className="p-6">
        <TaskSection />
      </div>
    </main>
  );
}
