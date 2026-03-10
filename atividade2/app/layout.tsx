import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Agenda",
  description: "Agenda de Tarefas Inteligente (To-Do List com Categorias e Filtros)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
