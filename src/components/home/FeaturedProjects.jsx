import ShowcaseList from "@/components/showcase/ShowcaseList";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects({ items, type, isAr }) {
  if (!items?.length) return null;

  return (
    <section className="container mx-auto px-4">
      <SectionTitle
        text={isAr ? "أعمالنا المميزة" : "Featured Projects"}
        desc={
          isAr
            ? "استكشف مجموعة من أبرز المشاريع التي نفذناها لعملائنا، والتي تعكس خبرتنا وجودة خدماتنا في مختلف المجالات."
            : "Explore a selection of our most outstanding projects that showcase our expertise, creativity, and commitment to delivering high-quality solutions."
        }
      />

      <ShowcaseList items={items} type={type} isAr={isAr} />
    </section>
  );
}
