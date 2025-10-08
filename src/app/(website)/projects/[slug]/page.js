"use client";
import { useParams } from "next/navigation";

export default function Projectspage() {
  const params = useParams();
  // const router = useRouter();
  const id = params?.id;
  return <div className="h-screen">{id}</div>;
}
